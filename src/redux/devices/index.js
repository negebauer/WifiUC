export const TOGGLE = 'TOGGLE'
export const ADD = 'ADD'
export const EDIT_NAME = 'EDIT_NAME'
export const REMOVE = 'REMOVE'
export const REFRESH = 'REFRESH'

export const toggle = (mac, active, loading, error) => {
  return {type: TOGGLE, mac, active, loading, error}
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

export const refresh = (devices, loading, error) => {
  return {type: REFRESH, devices, loading, error}
}

export const initialState = {
  /* id: {device} */
  loading: false,
  error: ''
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        [action.mac]: {
          ...state[action.mac],
          loading: action.loading,
          active: action.active,
          error: action.error
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
      return {
        ...action.devices.reduce((devices, device) => {
          devices[device.mac] = device
          return devices
        }, {}),
        loading: action.loading,
        error: action.error
      }
    default:
      return state
  }
}

export default reducer
