import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import "./index.css"
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { createAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const disp = useDispatch()

  useEffect(() => {
    disp(createAnecdotes())
  }, [disp])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
      <Filter />
    </div>
  )
}

export default App