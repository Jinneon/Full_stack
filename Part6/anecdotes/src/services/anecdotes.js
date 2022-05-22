import axios from "axios"
const link = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const resp = await axios.get(link)
  return resp.data
}

const create = async (content) => {
  const ane = {
    content,
    votes: 0
  }
  const resp = await axios.post(link, ane)
  return resp.data
}

const vote = async (id) => {
  const anecdotes = await axios.get(link)
  const toChange = anecdotes.data.find(anecdote => anecdote.id === id)
  
  const anetoAdd = {
    ...toChange,
    votes: toChange.votes + 1
  }
  const resp = await axios.put(`${link}/${id}`, anetoAdd)
  return resp.data
}

export default { getAll, create, vote }