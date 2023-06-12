const db = {
  user: [
    {
      id: '1',
      name: 'Carlos',
      username: 'carlos'
    },
    {
      id: '2',
      name: 'Fede',
      username: 'fede'
    }
  ]
}

async function list (table) {
  return db[table] || []
}

async function get (table, id) {
  const collection = await list(table)
  return collection.filter(item => item.id === id)[0] || null
}

async function upsert (table, data) {
  if (!db[table]) {
    db[table] = []
  }

  db[table].push(data)

  console.log(db)
}

async function remove (table, id) {
  return true
}

async function query (table, q) {
  const collection = await list(table)
  const keys = Object.keys(q)
  const key = keys[0]

  return collection.filter(item => item[key] === q[key])[0] || null
}

export default {
  list,
  get,
  upsert,
  remove,
  query
}
