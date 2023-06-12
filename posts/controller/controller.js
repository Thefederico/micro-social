import crypto from 'crypto'

const TABLE = 'posts'

function controller (injectedStore) {
  const store = injectedStore ?? require('../../src/db/dummy').default

  const list = async () => {
    const { data } = await store.list(TABLE)
    return data
  }

  const get = async id => {
    const { data } = await store.get(TABLE, id)
    return data
  }

  const upsert = async data => {
    const post = {
      text: data.text,
      user: data.user
    }

    if (data.id) {
      post.id = data.id
    } else {
      post.id = crypto.randomBytes(8).toString('hex')
    }

    const { data: response } = store.upsert(TABLE, post)

    return response
  }

  return {
    list,
    get,
    upsert
  }
}

export default controller
