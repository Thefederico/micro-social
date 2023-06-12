import { Router } from 'express'

import { Response } from '@routes/response'
import controller from './controller'

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body

  controller
    .login(username, password)
    .then(token => {
      Response.success(req, res, token, 200)
    })
    .catch(err => {
      console.log('🚀 ~ file: network.js:17 ~ router.post ~ err:', err)
      Response.error(req, res, 'Error', 400, err.message)
    })
})

export default router
