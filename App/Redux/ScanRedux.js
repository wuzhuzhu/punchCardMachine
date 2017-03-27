import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changeScanResult: ['patientId', 'patientName'],
  changeScanResultFake: null
  // custom: (a, b) => ({ type: 'CUSTOM', total: a + b })
})

export const ScanScreenTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  patientId: '',
  patientName: '',
  onInitQR: true
})

/* ------------- Reducers ------------- */

export const changeScanResult = (state, { patientId, patientName }) => {
  const previousId = state.patientId
  if (previousId === patientId) {
    return state
  } else {
    return state.merge({ patientId, patientName })
  }
}

export const changeScanResultFake = (state) => {
  console.log('我们在这里', state)
  return state
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_SCAN_RESULT]: changeScanResult,
  [Types.CHANGE_SCAN_RESULT_FAKE]: changeScanResultFake
})
