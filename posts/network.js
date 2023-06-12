import { Router } from 'express'

// import { checkAuth } from '@/middlewares/secure'
import { Response } from '@routes/response'
import controller from './controller'

const router = Router()

// get all posts
router.get('/', (req, res, next) => {
  controller
    .list()
    .then(posts => {
      Response.success(req, res, posts, 200)
    })
    .catch(next)
})

export default router
