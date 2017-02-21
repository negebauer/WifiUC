import {
  DEVICE_ACTIVATE,
  DEVICE_DEACTIVATE,
  DEVICE_ADD,
  DEVICE_EDIT,
  DEVICE_REMOVE,
  DEVICES_REFRESH
} from '../../actions'

const initialDevices = {
  isLoading: false,
  isFetching: false,
  items: {} // { id: {device} }
}

const devices = (state = initialDevices, action) => {
  switch (action.type) {
    case DEVICE_ACTIVATE:
      return state
    case DEVICE_DEACTIVATE:
      return state
    case DEVICE_ADD:
      return state
    case DEVICE_EDIT:
      return state
    case DEVICE_REMOVE:
      return state
    case DEVICES_REFRESH:
      return state
    default:
      return state
  }
}

export default devices
