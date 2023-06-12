import { Router } from 'express'

import { Response } from '@/routes/response'
import store from './redis'

const router = Router()

router.get('/:table', async (req, res, next) => {
  try {
    const { table } = req.params
    const result = await store.list(table)
    Response.success(req, res, result, 200)
  } catch (error) {
    next(error)
  }
})

router.get('/:table/:id', async (req, res, next) => {
  try {
    const { table, id } = req.params
    const result = await store.get(table, id)
    Response.success(req, res, result, 200)
  } catch (error) {
    next(error)
  }
})

router.put('/:table', async (req, res, next) => {
  try {
    const { table } = req.params
    const result = await store.upsert(table, req.body)
    Response.success(req, res, result, 200)
  } catch (error) {
    next(error)
  }
})

export default router
