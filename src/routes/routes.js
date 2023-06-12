import { Router } from 'express'

import { Response } from '@routes/response'
import userRouter from '@modules/user/network'
import authRouter from '@modules/auth/network'

function AppRouter (app) {
  const router = Router()
  app.use('/api/v1', router)

  router.get('/', (req, res) => {
    Response.success(req, res, 'Welcome to the API', 200)
  })

  router.use('/users', userRouter)
  router.use('/auth', authRouter)
}

export { AppRouter }
