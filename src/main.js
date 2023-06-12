import express from 'express'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'

import { config } from '@/config/config'
import { AppRouter } from '@routes/routes'
import { logger } from '@utils/logger'
import swaggerDocument from '@/config/swagger.json'
import { errors } from './middlewares/errors'

const { port, node_env: nodeEnv } = config

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan(nodeEnv === 'production' ? 'combined' : 'dev'))

AppRouter(app)
app.use('/app', express.static('public'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(errors)

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})
