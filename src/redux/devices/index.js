export const TOGGLE = 'TOGGLE'
export const ADD = 'ADD'
export const EDIT_NAME = 'EDIT_NAME'
export const REMOVE = 'REMOVE'
export const REFRESH = 'REFRESH'

export const toggle = (mac, active) => {
  return {type: TOGGLE, mac, active}
}

export const add = device => {
  return {type: ADD, device}
}

export const editName = (mac, name) => {
  return {type: EDIT_NAME, mac, name}
}

export const remove = mac => {
  return {type: REMOVE, mac}
}

export const refresh = devices => {
  return {type: REFRESH, devices}
}

/* id: {device} */
export const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        [action.mac]: {
          ...state[action.mac],
          active: action.active
        }
      }
    case ADD:
      return {
        ...state,
        [action.device.mac]: {
          ...action.device,
          active: false
        }
      }
    case EDIT_NAME:
      return {
        ...state,
        [action.mac]: {
          ...state[action.mac],
          name: action.name
        }
      }
    case REMOVE:
      const devices = {
        ...state
      }
      delete devices[action.mac]
      return devices
    case REFRESH:
      return action.devices.reduce((devices, device) => {
        devices[device.mac] = device
        return devices
      }, {})
    default:
      return state
  }
}

export default reducer
