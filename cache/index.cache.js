import express from 'express'

import { config } from '@/config/config'
import { logger } from '@/utils/logger'
import cacheRouter from './network'

const { cache } = config

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/db/cache', cacheRouter)

app.listen(cache.port, () => {
  logger.info(`[CACHE Service] running on port ${cache.port}`)
})
