import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('Unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('Should return correct ini state when state called is undefined', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const nState = counterReducer(undefined, action)
    expect(nState).toEqual(initialState)
  })

  test('Adds one to good', () => {
    const act = {
      type: 'GOOD'
    }
    const sta = initialState

    deepFreeze(sta)
    const nState = counterReducer(sta, act)
    expect(nState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('Bad works', () => {
    const act = {
      type: 'BAD'
    }
    const sta = initialState

    deepFreeze(sta)
    const nState = counterReducer(sta, act)
    expect(nState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('Reset everything to zero', () => {
    const act = {
      type: 'ZERO'
    }
    const sta = initialState

    deepFreeze(sta)
    const nState = counterReducer(sta, act)
    expect(nState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})