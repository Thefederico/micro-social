import * as redis from 'redis'

import { logger } from '@/utils/logger'

const client = redis.createClient()

await client.connect()

async function list (table) {
  try {
    const result = await client.get(table)

    return JSON.parse(result)
  } catch (error) {
    logger.error(error)

    return []
  }
}

async function get (table, id) {
  try {
    const result = await client.get(`${table}_${id}`)
    return JSON.parse(result)
  } catch (error) {
    logger.error(error)
    return null
  }
}

async function upsert (table, data) {
  try {
    let key = table
    if (data && data.id) {
      key = `${key}_${data.id}`
    }
    const result = await client.setEx(key, 10, JSON.stringify(data))
    return result
  } catch (error) {
    logger.error(error)
    return false
  }
}

export default {
  list,
  get,
  upsert
}
