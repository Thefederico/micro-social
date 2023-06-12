import mysql from 'mysql2'

import { config } from '../src/config/config'
import { logger } from '@/utils/logger'
import { error as Error } from '@/middlewares/errors'

const { host, user, password, database } = config.mysql

const connection = mysql.createConnection(
  `mysql://${user}:${password}@${host}/${database}`
)

function handleConnection () {
  connection.connect(error => {
    if (error) {
      logger.error('[db error]', error)
      setTimeout(handleConnection, 2000)
    } else {
      logger.info('DB Connected!')
    }
  })

  connection.on('error', error => {
    logger.error('[db error]', error)
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection()
    } else {
      throw error
    }
  })
}

handleConnection()

function list (table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, data) => {
      if (error) {
        return reject(error)
      }

      resolve(data)
    })
  })
}

function get (table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id='${id}'`,
      (error, data) => {
        if (error) {
          return reject(error)
        }

        if (data.length === 0) {
          return reject(new Error(`No hay registros con id ${id}`, 404))
        }

        resolve(data)
      }
    )
  })
}

function insert (table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (error, response) => {
      if (error) {
        return reject(error)
      }

      resolve(response)
    })
  })
}

function update (table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (error, response) => {
        if (error) {
          return reject(error)
        }

        resolve(response)
      }
    )
  })
}

async function upsert (table, data) {
  try {
    await get(table, data.id)
    return update(table, data)
  } catch (error) {
    return insert(table, data)
  }
}

function query (table, query, join) {
  let joinQuery = ''

  if (join) {
    const key = Object.keys(join)[0]
    const val = join[key]
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
  }

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ?`,
      query,
      (error, data) => {
        if (error) {
          return reject(error)
        }

        resolve(data[0] ?? null)
      }
    )
  })
}

export default {
  list,
  get,
  upsert,
  query,
  insert,
  update
}
