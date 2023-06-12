import axios from 'axios'

function createRemoteDB (host, port) {
  const URL = `http://${host}:${port}/db/cache`

  const list = async table => {
    const response = await axios.get(`${URL}/${table}`)
    return response.data
  }

  const get = async (table, id) => {
    const response = await axios.get(`${URL}/${table}/${id}`)
    return response.data
  }

  const upsert = async (table, data) => {
    const response = await axios.put(`${URL}/${table}`, data)
    return response.data
  }

  return {
    list,
    get,
    upsert
  }
}

export default createRemoteDB
