import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"
import { setNoti } from "../reducers/notificationReducer"

const css = {
  marginBottom: 1,
  backgroundColor: "gold",
  border: "solid",
  borderRadius: 50,
  color: "black"
}
const Anecdote = ({ anecdote, addVote }) => {
  return (
    <div style={css}>
      <li>
        {anecdote.content}
      </li>
      <div>
        Votecount is {anecdote.votes}{" "}
        <button onClick={() => addVote(anecdote)}>Vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const disp = useDispatch()
  const filtered = useSelector(state => state.anecdotes
    .filter(ane => 
      ane.content.toLowerCase().includes(state.filter.toLowerCase())
    )  
    .sort((fir, sec) => sec.votes - fir.votes)
  )
  const voted = (anecdote) => {
    disp(vote(anecdote.id))
    disp(setNoti(`Voted: \"${anecdote.content}\"`, 5))
  }
  return (
    <div>
      {filtered.map(anecdote =>
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote} addVote={voted} />
        </div>
      )}
    </div>
  )
}
export default AnecdoteList