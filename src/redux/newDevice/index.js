import {REHYDRATE} from 'redux-persist/constants'
import Format from '../../utils/format'

/* Action types */

export const UPDATE = 'NEW_DEVICE_UPDATE'
export const RESET = 'NEW_DEVICE_RESET'
export const SHOW_ERROR = 'NEW_DEVICE_SHOW_ERROR'

/* Action creators */

export const update = device => {
  return {type: UPDATE, device}
}

export const reset = () => {
  return {type: RESET}
}

export const showError = () => {
  return {type: SHOW_ERROR}
}

/* Initial state */

export const initialState = {
  name: '',
  mac: '',
  error: '',
  showError: false
}

/* Reducer */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      const mac = Format.mac(action.device.mac)
      const valid = Format.macValidate(mac)
      //
      return {
        ...state,
        ...action.device,
        mac: mac.toUpperCase(),
        error: (!valid && 'Dirección mac inválida') || ''
      }
    case RESET:
      return initialState
    case SHOW_ERROR:
      return {
        ...state,
        showError: true
      }
    case REHYDRATE:
      return state
    default:
      return state
  }
}

export default reducer
