import { Router } from 'express'

import { Response } from '@/routes/response'
import store from './mysql'

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

router.post('/:table', async (req, res, next) => {
  try {
    const { table } = req.params
    const result = await store.insert(table, req.body)
    Response.success(req, res, result, 201)
  } catch (error) {
    next(error)
  }
})

router.post('/:table/query', async (req, res, next) => {
  try {
    const { table } = req.params
    const { query, join } = req.body
    const result = await store.query(table, query, join)
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
