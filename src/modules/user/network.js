import { Router } from 'express'

import { checkAuth } from '@/middlewares/secure'
import { Response } from '@routes/response'
import controller from './controller'

const router = Router()

// get all users
router.get('/', (req, res, next) => {
  controller
    .list()
    .then(users => {
      Response.success(req, res, users, 200)
    })
    .catch(next)
})

// get following users
router.get('/following', checkAuth('follow'), (req, res, next) => {
  controller
    .following(req.user.id)
    .then(data => {
      Response.success(req, res, data, 200)
    })
    .catch(next)
})

// get user by id
router.get('/:id', (req, res, next) => {
  controller
    .get(req.params.id)
    .then(user => {
      Response.success(req, res, user, 200)
    })
    .catch(next)
})

// create user
router.post('/', (req, res, next) => {
  controller
    .upsert(req.body)
    .then(user => {
      Response.success(req, res, user, 201)
    })
    .catch(next)
})

// update user
router.put('/', checkAuth('update'), (req, res, next) => {
  controller
    .upsert(req.body)
    .then(user => {
      Response.success(req, res, user, 201)
    })
    .catch(next)
})

// follow user
router.post('/:id/follow', checkAuth('follow'), (req, res, next) => {
  controller
    .follow(req.user.id, req.params.id)
    .then(data => {
      Response.success(req, res, data, 201)
    })
    .catch(next)
})

export default router
