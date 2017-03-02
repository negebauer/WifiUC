import Devices from './devices'
import Device from './device'
import Format from '../../utils/format'
import {REHYDRATE} from 'redux-persist/constants'
import Session from '../user/session'
import {devicesList} from '../selectors'

const session = user => new Session(user)

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

export const fetchToggle = (user, device) => dispatch => {
  dispatch(toggle(device.mac, device.active, true, ''))
  Device.toggle(session(user), device)
    .then(() => dispatch(toggle(device.mac, !device.active, false, '')))
    .catch(err =>
      dispatch(toggle(device.mac, device.active, false, err.message)))
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

export const remove = mac => ({type: REMOVE, mac})

export const refresh = (devices, loading, error) => ({
  type: REFRESH,
  devices,
  loading,
  error,
})

export const fetchRefresh = user => dispatch => {
  dispatch(refresh([], true, ''))
  Devices.loadDevicesRemote(session(user))
    .then(devices => dispatch(refresh(devices, false, '')))
    .catch(err => dispatch(refresh([], false, err.message)))
}

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
      if (state.loading) {
        return state
      }
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
        ...initialState,
        ...state,
        ...action.devices.reduce(
          (devices, device) => {
            devices[device.mac] = {...device, loading: false, error: ''}
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
        const devices = devicesList(action.payload)
          .map(device => ({
            ...device,
            loading: false,
            error: '',
            active: false,
          }))
          .reduce(
            (object, device) => {
              object[device.mac] = device
              return object
            },
            {},
          )
        return {
          ...state,
          ...devices,
          editing: false,
          adding: false,
          error: '',
          loading: false,
        }
      }
      return state
    default:
      return state
  }
}

export default reducer
