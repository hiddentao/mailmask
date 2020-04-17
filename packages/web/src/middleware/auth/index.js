import nookies from 'nookies'
import { _ } from '@mailmask/utils'

import { encrypt, decrypt } from '../../utils/crypto'

export const middleware = ({ db, config }) => next => async (req, res) => {
  const CRYPTO_PARAMS = {
    key: config.ENCRYPTION_KEY,
    iv: config.ENCRYPTION_IV,
  }

  let session = {}

  await req.span.withAsyncSpan('get auth cookie', async ({ span }) => {
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

        span.recordEvent('authenticated', { id: user.id })
      }
    } catch (err) {
      // not authenticated!
      span.recordEvent('not authenticated')
    }
  })

  req.session = Object.freeze({ ...session })

  res.setUser = async ({ id }) => {
    await req.span.withAsyncSpan('set auth cookie', async () => {
      if (!id) {
        nookies.destroy({ res }, 'user', { path: '/' })
      } else {
        const expires = new Date(Date.now() + /* 1 month */ 2592000000)

        const val = await encrypt({ expires, id }, CRYPTO_PARAMS)

        nookies.set({ res }, 'user', val, {
          maxAge: Number.MAX_SAFE_INTEGER, // never expires
          path: '/',
          // security: no JS access to cookie
          httpOnly: true,
          // security: prevent CSRF
          sameSite: true,
          // on live site we want to enforce HTTPS for logged-in sessions
          secure: (config.APP_MODE === 'live'),
        })
      }
    })
  }

  await next(req, res)
}
