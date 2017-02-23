import Format from '../../utils/format'

export const NEW_DEVICE_UPDATE = 'NEW_DEVICE_UPDATE'

export const newDeviceUpdate = device => {
  return {type: NEW_DEVICE_UPDATE, device}
}

export const initialState = {
  name: '',
  mac: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_DEVICE_UPDATE:
      return {
        ...state,
        ...action.device,
        mac: Format.mac(action.device.mac).toUpperCase()
      }
    default:
      return state
  }
}

export default reducer
