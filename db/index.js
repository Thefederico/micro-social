import express from 'express'

import { config } from '@/config/config'
import { logger } from '@/utils/logger'
import dbRouter from './network'

const { mysql } = config

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/db', dbRouter)

app.listen(mysql.port, () => {
  logger.info(`[MYSQL Service] running on port ${mysql.port}`)
})
