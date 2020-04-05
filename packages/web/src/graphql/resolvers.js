import { differenceInSeconds } from 'date-fns'
import { _, recoverSigningAccount } from '@solui/utils'
import { assertSpecValid } from '@solui/processor'
import {
  defaultResolvers,
  createErrorResponse,
  ERROR_CODES,
} from '@solui/graphql'

import { getEmbedUrl, getShortEmbedUrl, getFinalizeUrl } from '../../frontend/utils'
import { getRepoContractServerSide } from '../../frontend/chain'
import { uploadReleaseToTemporalIpfs } from '../utils/data'
import { generateAuthToken } from '../auth'

export default ({ db, log, config }) => {
  return {
    Query: {
      getAuthToken: async (_ignore, { loginToken }) => {
        const user = await db.getUserForLoginToken({ loginToken })

        if (!user) {
          return createErrorResponse(ERROR_CODES.NOT_FOUND)
        }

        return generateAuthToken(user.address)
      },
      getMyProfile: async (_ignore, __ignore, ctx) => {
        if (!ctx.user) {
          return createErrorResponse(ERROR_CODES.NOT_LOGGED_IN)
        }

        const u = await db.getUser({ address: ctx.user.address })

        return u || createErrorResponse(ERROR_CODES.NOT_FOUND)
      },
      getRelease: async (_ignore, { id }) => {
        const r = await db.getRelease({ id })

        if (!r) {
          return createErrorResponse(ERROR_CODES.NOT_FOUND)
        }

        return r
      },
      getMyReleases: async (_ignore, { paging }, ctx) => {
        if (!ctx.user) {
          return createErrorResponse(ERROR_CODES.NOT_LOGGED_IN)
        }

        return db.getUserReleases({ userId: ctx.user.id, ...paging })
      },
      getAllReleases: async (_ignore, { paging }) => {
        return db.getAllReleases({ ...paging })
      }
    },
    Mutation: {
      publish: async (_ignore, { bundle: { spec, artifacts } }, ctx) => {
        if (!ctx.user) {
          return createErrorResponse(ERROR_CODES.NOT_LOGGED_IN)
        }

        log.info(`Publishing spec ...`)

        try {
          log.debug(`Checking spec validity ...`)

          await assertSpecValid({ spec, artifacts })
        } catch (err) {
          let errStr = err.message

          if (err.details) {
            errStr += `:\n${err.details.join(`\n`)}`
          }

          return createErrorResponse(ERROR_CODES.INVALID, errStr)
        }

        log.debug(`Checking if spec is already in db ...`)

        let { cid, id } = await db.getReleaseForSpecArtifacts({ spec, artifacts }) || {}

        if (!id) {
          log.debug(`Not in db, so create entry ...`)

          try {
            log.debug(`Uploading to IPFS first ...`)

            cid = await uploadReleaseToTemporalIpfs({ spec, artifacts })

            log.debug(`... cid: ${cid}`)
          } catch (err) {
            return createErrorResponse(ERROR_CODES.HASH_ERROR, err.message)
          }

          id = await db.saveRelease({ userId: ctx.user.id, cid, spec, artifacts })
        }

        log.debug(`Checking if dapp published to on-chain repo ...`)

        let dappPublishedToRepo

        try {
          const repo = await getRepoContractServerSide({ config })
          const { numContracts_: numContracts } = await repo.call('getDapp', cid)
          dappPublishedToRepo = (numContracts.toNumber() > 0)
        } catch (err) {
          return createErrorResponse(ERROR_CODES.CHAIN_ERROR, err.message)
        }

        // if not yet published to repo
        if (!dappPublishedToRepo) {
          log.debug(`Not yet published to on-chain repo, so lets tell client do that first.`)

          return { finalizeUrl: getFinalizeUrl(id) }
        } else {
          // at this point it's in the on-chain repo and already uploaded so let's return the values
          log.debug('Dapp fully published.')

          return { cid, url: getEmbedUrl(cid), shortUrl: getShortEmbedUrl(cid) }
        }
      },
      login: async (_ignore, { challenge, signature, loginToken }) => {
        log.info(`Extracting challenge string timestamp ...`)

        const str = challenge.match(/\(([^\\)]+)\)/)

        const ts = _.get(str, '1')

        if (!ts) {
          return createErrorResponse(ERROR_CODES.INVALID, 'Challenge response invalid. Please try logging in again.')
        }

        const diffSeconds = differenceInSeconds(Date.now(), new Date(ts))

        if (0 > diffSeconds || 60 < diffSeconds /* between 0 and 60 seconds */) {
          return createErrorResponse(ERROR_CODES.EXPIRED, 'Challenge response is out of date. Please try logging in again.')
        }

        log.debug(`Recovering user address ...`)

        const address = recoverSigningAccount(challenge, signature)

        log.debug(`... ${address}`)

        await db.ensureUserExists({ address })

        if (loginToken) {
          await db.saveLoginToken({ address, loginToken })
        }

        return generateAuthToken(address)
      },
    },
    ...defaultResolvers,
  }
}


