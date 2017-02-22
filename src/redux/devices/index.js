export const DEVICE_TOGGLE = 'DEVICE_TOGGLE'
export const DEVICE_ADD = 'DEVICE_ADD'
export const DEVICE_EDIT_NAME = 'DEVICE_EDIT_NAME'
export const DEVICE_REMOVE = 'DEVICE_REMOVE'
export const DEVICES_REFRESH = 'DEVICES_REFRESH'

export const deviceToggle = (mac, active) => {
  return {type: DEVICE_TOGGLE, mac, active}
}

export const deviceAdd = device => {
  return {type: DEVICE_ADD, device}
}

export const deviceEditName = (mac, name) => {
  return {type: DEVICE_EDIT_NAME, mac, name}
}

export const deviceRemove = mac => {
  return {type: DEVICE_REMOVE, mac}
}

export const devicesRefresh = devices => {
  return {type: DEVICES_REFRESH, devices}
}

/* id: {device} */
export const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DEVICE_TOGGLE:
      return {
        ...state,
        [action.mac]: {
          ...state[action.mac],
          active: action.active
        }
      }
    case DEVICE_ADD:
      return {
        ...state,
        [action.device.mac]: {
          ...action.device,
          active: false
        }
      }
    case DEVICE_EDIT_NAME:
      return {
        ...state,
        [action.mac]: {
          ...state[action.mac],
          name: action.name
        }
      }
    case DEVICE_REMOVE:
      const devices = {
        ...state
      }
      delete devices[action.mac]
      return devices
    case DEVICES_REFRESH:
      return action.devices.reduce((devices, device) => {
        devices[device.mac] = device
        return devices
      }, {})
    default:
      return state
  }
}

export default reducer
