import got from 'got'
import { hash, uploadDataToIpfs } from '@solui/utils'

import { TEMPORAL_PASSWORD } from '../../config'

export const calculateReleaseHash = ({ spec, artifacts }) => {
  const artifactNames = Object.keys(artifacts)
  artifactNames.sort((a, b) => a.localeCompare(b))
  const sortedArtifacts = artifactNames.map(k => artifacts[k])
  return hash([ spec, sortedArtifacts ])
}

const TEMPORAL_API_ENDPOINT = 'https://api.ipfs.temporal.cloud:443/api/v0'

const getClientOptions = async () => {
  let loginToken

  try {
    const ret = await got.post('https://api.temporal.cloud/v2/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ username: 'solui', password: TEMPORAL_PASSWORD }),
    })

    loginToken = JSON.parse(ret.body).token
  } catch (err) {
    throw new Error(`Could not obtain IPFS login token: ${err.message}`)
  }

  return {
    headers: {
      Authorization: `Bearer ${loginToken}`
    }
  }
}

export const calculateTemporalIpfsHash = async ({ spec, artifacts }) => {
  const clientOptions = await getClientOptions()

  try {
    // for now we just do an upload since temporal API doesn't support fetching just the hash
    const ret = await uploadDataToIpfs(JSON.stringify({ spec, artifacts }), TEMPORAL_API_ENDPOINT, clientOptions)

    return ret[ret.length - 1].hash
  } catch (err) {
    throw new Error(`IPFS hash calculation error ${err.message}`)
  }
}

export const uploadReleaseToTemporalIpfs = async ({ spec, artifacts }) => {
  const clientOptions = await getClientOptions()

  try {
    const ret = await uploadDataToIpfs(JSON.stringify({ spec, artifacts }), TEMPORAL_API_ENDPOINT, clientOptions)

    return ret[ret.length - 1].hash
  } catch (err) {
    throw new Error(`IPFS upload error ${err.message}`)
  }
}

