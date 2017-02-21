import {combineReducers} from 'redux'
import {
  LOGIN,
  LOGOUT,
  DEVICE_ACTIVATE,
  DEVICE_DEACTIVATE,
  DEVICE_ADD,
  DEVICE_EDIT,
  DEVICE_REMOVE,
  DEVICES_REFRESH
} from '../actions'

const initialState = {
  user: {
    username: '',
    password: '',
    isLogged: false,
    isLogging: false
  },
  devices: {
    isLoading: false,
    isFetching: false,
    devices: {} // { id: {device} }
  }
}

const login = (state, action) => {
  return {
    ...state,
    ...action.user
  }
}

const wifiuc = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: login(state.user, action)
      }
    case LOGOUT:
      break
    case DEVICE_ACTIVATE:
      break
    case DEVICE_DEACTIVATE:
      break
    case DEVICE_ADD:
      break
    case DEVICE_EDIT:
      break
    case DEVICE_REMOVE:
      break
    case DEVICES_REFRESH:
      break
  }
}

export default wifiuc
wifiuc
