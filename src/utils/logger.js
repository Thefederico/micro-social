import { createLogger, format, transports } from 'winston'

const logConfiguration = {
  transports: [new transports.Console()],
  format: format.combine(
    format.label({ label: '' }),
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    format.align(),
    format.printf(
      info => `${info.level}: ${[info.timestamp]}: ${info.message}`
    ),
    format.printf(
      error => `${error.level}: ${[error.timestamp]}: ${error.message}`
    )
  )
}

const logger = createLogger(logConfiguration)

export { logger }
