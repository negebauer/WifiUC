import Format from '../../utils/format'
import {REHYDRATE} from 'redux-persist/constants'
import session from '../user'

/* Action types */

export const TOGGLE = 'DEVICE_TOGGLE'
export const ADD = 'DEVICE_ADD'
export const TOGGLE_EDIT = 'DEVICE_TOGGLE_EDIT'
export const TOGGLE_ADD = 'DEVICE_TOGGLE_ADD'
export const EDIT_NAME = 'DEVICE_EDIT_NAME'
export const REMOVE = 'DEVICE_REMOVE'
export const REFRESH = 'DEVICES_REFRESH'

/* Action creators */

export const toggle = (mac, active, loading, error) => {
  return {type: TOGGLE, mac, active, loading, error}
}

export const add = device => {
  return {type: ADD, device}
}

export const toggleEdit = () => {
  return {type: TOGGLE_EDIT}
}

export const toggleAdd = () => {
  return {type: TOGGLE_ADD}
}

export const editName = (mac, name) => {
  return {type: EDIT_NAME, mac, name}
}

export const remove = mac => {
  return {type: REMOVE, mac}
}

export const refresh = (devices, loading, error) => {
  return {type: REFRESH, devices, loading, error}
}

export const fetchRefresh = (user, devices) => {}

/* Initial state */

export const initialState = {
  /* id: {device} */
  loading: false,
  error: '',
  editing: false,
  adding: false,
}
/* Device
{
  mac: String,
  name: String,
  active: Bool,
  loading: Bool,
  error: String
}
*/

/* Reducer */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        [action.mac]: {
          ...state[action.mac],
          loading: action.loading,
          active: action.active,
          error: action.error,
        },
      }
    case ADD:
      if (state[action.device.mac]) {
        return {
          ...state,
          error: 'Intentaste agregar un dispositivo con una dirección mac existente',
          adding: false,
        }
      }
      const mac = Format.mac(action.device.mac)
      //
      return {
        ...initialState,
        ...state,
        [mac]: {
          name: action.device.name,
          active: false,
          loading: false,
          error: '',
          mac: mac,
        },
        adding: false,
      }
    case TOGGLE_EDIT:
      return {
        ...state,
        editing: !state.editing,
      }
    case TOGGLE_ADD:
      return {
        ...state,
        adding: !state.adding,
      }
    case EDIT_NAME:
      return {
        ...state,
        [action.mac]: {
          ...state[action.mac],
          name: action.name,
        },
      }
    case REMOVE:
      const devices = {
        ...state,
      }
      delete devices[action.mac]
      return devices
    case REFRESH:
      return {
        ...action.devices.reduce(
          (devices, device) => {
            devices[device.mac] = device
            return devices
          },
          {},
        ),
        loading: action.loading,
        error: action.error,
      }
    case REHYDRATE:
      const incoming = action.payload.devices
      if (incoming) {
        return {
          ...state,
          ...incoming,
          editing: false,
          adding: false,
          error: '',
        }
      }
      return state
    default:
      return state
  }
}

export default reducer
