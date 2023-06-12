import crypto from 'crypto'

import auth from '@modules/auth/controller'

const TABLE = 'users'

function controller (injectedStore, injectedCache) {
  const store = injectedStore ?? require('../../../db/dummy').default
  const cache = injectedCache ?? require('../../../db/dummy').default

  const list = async () => {
    let users = null
    const { data } = await cache.list(TABLE)

    if (data.length === 0) {
      console.log('No estaba en cache. Buscando en DB')
      users = await store.list(TABLE)
      cache.upsert(TABLE, users)
    } else {
      console.log('Nos traemos datos de cache')
      users = data
    }

    return users
  }

  const get = async id => {
    const { data } = await store.get(TABLE, id)
    return data
  }

  const upsert = async data => {
    const user = {
      name: data.name,
      username: data.username
    }

    if (data.id) {
      user.id = data.id
    } else {
      user.id = crypto.randomBytes(8).toString('hex')
    }

    if (data.password || data.username) {
      await auth.upsert({
        id: user.id,
        username: data.username,
        password: data.password
      })
    }

    const { data: result } = await store.upsert(TABLE, user)
    return result
  }

  const follow = async (from, to) => {
    const { data } = await store.upsert('user_follow', {
      id: crypto.randomBytes(8).toString('hex'),
      user_from: from,
      user_to: to
    })

    return data
  }

  const following = async user => {
    const join = {}
    join[TABLE] = 'user_to'
    const query = { user_from: user }
    const { data } = await store.query('user_follow', query, join)
    return data
  }

  return {
    list,
    get,
    upsert,
    follow,
    following
  }
}

export default controller
