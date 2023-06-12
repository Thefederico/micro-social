import axios from 'axios'

function createRemoteDB (host, port) {
  const URL = `http://${host}:${port}/db`

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

  const query = async (table, query, join) => {
    const response = await axios.post(`${URL}/${table}/query`, { query, join })
    return response.data
  }

  const insert = async (table, data) => {
    const response = await axios.post(`${URL}/${table}`, data)
    return response.data
  }

  return {
    list,
    get,
    upsert,
    query,
    insert
  }
}

export default createRemoteDB
