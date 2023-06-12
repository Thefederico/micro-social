import jwt from 'jsonwebtoken'

import { config } from '@/config/config'
import { error as Error } from '@/middlewares/errors'

const secret = config.jwtSecret

function sign (data) {
  return jwt.sign(data, secret)
}

function verify (token) {
  return jwt.verify(token, secret)
}

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req)

    if (decoded.id !== owner) {
      throw new Error('No puedes hacer esto', 401)
    }
  },
  logged: req => {
    const decoded = decodeHeader(req)

    if (!decoded) {
      throw new Error('No puedes hacer esto', 401)
    }
  }
}

function getToken (auth) {
  if (!auth) {
    throw new Error('No viene token', 401)
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Formato invalido', 401)
  }

  const token = auth.replace('Bearer ', '')
  return token
}

function decodeHeader (req) {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verify(token)

  req.user = decoded

  return decoded
}

export { sign, check }
