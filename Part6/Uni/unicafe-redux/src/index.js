import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

import "./index.css"
const store = createStore(reducer)

const App = () => {
  const Good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const Ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const Bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const Zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  return (
    <div>
         <button onClick={Good}>Good</button>
       <button onClick={Ok}>Ok</button>
      <button onClick={Bad}>Bad</button>
      <button onClick={Zero}>Reset stats</button>

      <div>Good {store.getState().good}</div>
      <div>Ok {store.getState().ok}</div>
      <div>Bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
