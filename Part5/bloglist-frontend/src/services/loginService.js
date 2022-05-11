import axios from "axios"
const link = "/api/login"

const login = async (username, password) => {
  const resp = await axios.post(link, { username, password })
  return resp.data
}
export default { login }