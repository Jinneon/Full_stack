import { connect } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNoti } from '../reducers/notificationReducer'
///
const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const dataToAdd = event.target.anecdote.value
    event.target.anecdote.value = ""
    props.createAnecdote(dataToAdd)
    props.setNoti(`New anecdote \"${dataToAdd}\" has been created`, 5)
  }
  
  return (
    <div>
      <h2>Add new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div><input type="text" name="anecdote"/></div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
const propsDisp = {
  createAnecdote,
  setNoti,
}
export default connect(
  null,
  propsDisp
)(AnecdoteForm)