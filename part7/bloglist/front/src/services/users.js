import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const request = axios.get(baseUrl)
  return await request.then((response) => response.data)
}

export default { getAll }
