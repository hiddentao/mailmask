import jwt from 'jsonwebtoken'
import { _ } from '@solui/utils'

import config from '../../config'
import { encrypt, decrypt } from '../utils/crypto'

const SECRET = 'solui'
const ALGORITHM = 'HS256'

const CRYPTO_PARAMS = {
  key: config.ENCRYPTION_KEY,
  iv: config.ENCRYPTION_IV,
}

export const generateAuthToken = async address => {
  const expires = new Date(Date.now() + /* 1 month */ 2592000000)

  const authBlob = await encrypt({ expires, address }, CRYPTO_PARAMS)

  const token = jwt.sign({ authBlob }, SECRET, {
    algorithm: ALGORITHM
  })

  return { token, expires }
}

const AUTH_PREFIX = 'Bearer '

export const middleware = ({ db, log }) => next => async (req, res) => {
  req.state = {}

  let decoded

  try {
    let authToken = _.get(req, 'headers.authorization')

    if (typeof authToken === 'string' && authToken.startsWith(AUTH_PREFIX)) {
      authToken = authToken.substr(AUTH_PREFIX.length)
    }

    decoded = jwt.verify(authToken, SECRET, {
      algorithm: ALGORITHM
    })
  } catch (err) {
    // not authenticated!
  }

  if (decoded) {
    try {
      const { authBlob } = decoded

      let expires
      let address

      try {
        ({ expires, address } = await decrypt(authBlob, CRYPTO_PARAMS))
      } catch (err) {
        throw new Error('Authentication token is corrupted!')
      }

      if (new Date(expires).getTime() < Date.now()) {
        throw new Error('Authentication token has expired!')
      }

      const user = await db.getUser({ address })

      if (!user) {
        throw new Error('Authentication token is invalid!')
      }

      req.state.user = { address, id: user.id }
    } catch (err) {
      log.debug(err.message)
    }
  }

  await next(req, res)
}
