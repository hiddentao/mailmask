import nookies from 'nookies'
import { _ } from '@camomail/utils'

import { encrypt, decrypt } from '../../utils/crypto'

export const middleware = ({ db, config }) => next => async (req, res) => {
  const CRYPTO_PARAMS = {
    key: config.ENCRYPTION_KEY,
    iv: config.ENCRYPTION_IV,
  }

  let session = {}

  try {
    const userCookie = _.get(nookies.get({ req }), 'user')

    if (userCookie) {
      let expires
      let id

      try {
        ({ expires, id } = await decrypt(userCookie, CRYPTO_PARAMS))
      } catch (err) {
        throw new Error('Auth cookie is corrupted!')
      }

      if (new Date(expires).getTime() < Date.now()) {
        throw new Error('Auth cookie token has expired!')
      }

      const user = await db.getUserById(id)
      if (!user) {
        throw new Error('Auth cookie token is invalid!')
      }

      session = {
        ...user
      }
    }
  } catch (err) {
    // not authenticated!
  }

  req.session = Object.freeze({ ...session })

  res.setUser = async ({ id }) => {
    const expires = new Date(Date.now() + /* 1 month */ 2592000000)

    const val = await encrypt({ expires, id }, CRYPTO_PARAMS)

    nookies.set({ res }, 'user', val, {
      maxAge: Number.MAX_SAFE_INTEGER, // never expires
      path: '/',
      httpOnly: true,
      // on live site we want to enforce HTTPS for logged-in sessions
      secure: (config.APP_MODE === 'live'),
    })
  }

  await next(req, res)
}
