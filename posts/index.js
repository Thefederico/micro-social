import express from 'express'

import { config } from '@/config/config'
import { logger } from '@/utils/logger'
import router from './network'
import { errors } from '@/middlewares/errors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/posts', router)

app.use(errors)

app.listen(config.post.port, () => {
  logger.info(`[POSTS service] listening on port ${config.post.port}`)
})
