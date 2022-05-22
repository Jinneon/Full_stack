const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const Reducer = (state = initialState, action) => {
  console.log(action)
  const changedState = {...state}
  switch (action.type) {
    case 'GOOD':
      changedState.good += 1
     return changedState
      
    case 'OK':
      changedState.ok +=1
      return changedState
    case 'BAD':
      changedState.bad += 1
      return changedState
    case 'ZERO':
      for (const i in changedState)
     {
        changedState[i] = 0
      }
      return changedState
    default: return state
  }
  
}

export default Reducer