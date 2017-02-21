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
  username: '',
  password: '',
  isUserLogged: false,
  isUserLoggin: false,
  isDevicesLoading: false,
  isDevicesFetching: false,
  devices: {} // { id: {device} }
}

const login = (state, action) => {
  return {
    ...state,
    ...action.user,
    isUserLogged: true
  }
}

const logout = (state, action) => {
  const logout = {
    username: '',
    password: '',
    isUserLogged: false,
    isUserLoggin: false
  }
  return {
    ...state,
    ...logout
  }
}

const wifiuc = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...login(state, action)
      }
    case LOGOUT:
      return {
        ...state,
        ...logout(state, action)
      }
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
