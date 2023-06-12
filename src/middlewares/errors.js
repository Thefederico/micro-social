import { logger } from '@/utils/logger'
import { Response } from '@routes/response'

function error (message, code) {
  const e = new Error(message)

  if (code) {
    e.statusCode = code
  }

  return e
}

function errors (err, req, res, next) {
  logger.error(err)

  const message = err.message || 'Internal error'
  const status = err.statusCode || 500

  Response.error(req, res, message, status)
}

export { errors, error }
