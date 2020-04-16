import url from 'url'
import config from '../config'

export const buildUrlPath = (pathname, query) => url.format({ pathname, query })

export const buildBackendUrl = urlPath => url.resolve(config.WEB_URL, urlPath)

export const buildMaskAddress = (prefix, username) => `${prefix}@${username}.${config.DOMAIN}`
