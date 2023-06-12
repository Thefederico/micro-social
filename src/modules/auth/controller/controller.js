import bcrypt from 'bcrypt'

import { sign } from '../strategies/jwt.strategy'

function controller (injectedStore) {
  const store = injectedStore || require('../../../db/dummy').default

  const login = async (username, password) => {
    const { data: user } = await store.query('auth', { username })
    if (!user) {
      throw new Error('Invalid data')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Invalid data')
    }
    return sign(user)
  }

  const upsert = async data => {
    const authData = {
      id: data.id
    }

    if (data.username) {
      authData.username = data.username
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5)
    }

    return store.upsert('auth', authData)
  }

  return {
    upsert,
    login
  }
}

export default controller
