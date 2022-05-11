import axios from "axios"
const link = "/api/blogs"

const getAll = () => {
  const req = axios.get(link)
  return req.then(resp => resp.data)
}
const addBlog = async (bObj) => {
  const auth = {
    headers: { Authorization: token },
  }
  const resp = await axios.post(link, bObj, auth)
  return resp.data
}

const addLike = async (bObj, blogId) => {
  const auth = {
    headers: { Authorization: token },
  }

  const resp = await axios.put(`${link}/${blogId}`, bObj, auth)
  return resp.data
}

const deleteBlog = async (bObj) => {
  const auth = {
    headers: { Authorization: token }
  }

  const resp = await axios.delete(`${link}/${bObj.id}`, auth)
  return resp.data
}
let token = null
const setToken = (newT) => {
  token = `bearer ${newT}`
}

export default { getAll , setToken, addBlog, addLike, deleteBlog }