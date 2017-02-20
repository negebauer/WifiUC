/* Action types */

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const DEVICE_ACTIVATE = 'DEVICE_ACTIVATE'
export const DEVICE_DEACTIVATE = 'DEVICE_DEACTIVATE'
export const DEVICE_ADD = 'DEVICE_ADD'
export const DEVICE_EDIT = 'DEVICE_EDIT'
export const DEVICE_REMOVE = 'DEVICE_REMOVE'
export const DEVICES_REFRESH = 'DEVICES_REFRESH'

/* Action creators */

export const login = user => {
  return {type: LOGIN, user}
}

export const logout = user => {
  return {type: LOGOUT, user}
}

export const deviceActivate = mac => {
  return {type: DEVICE_ACTIVATE, mac}
}

export const deviceDeactivate = mac => {
  return {type: DEVICE_DEACTIVATE, mac}
}

export const deviceAdd = device => {
  return {type: DEVICE_ADD, device}
}

export const deviceEdit = (deviceOld, deviceNew) => {
  return {type: DEVICE_EDIT, deviceOld, deviceNew}
}

export const deviceRemove = mac => {
  return {type: DEVICE_REMOVE, mac}
}

export const devicesRefresh = () => {
  return {type: DEVICES_REFRESH}
}
