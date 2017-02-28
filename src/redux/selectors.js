import {createSelector} from 'reselect'

const getDevices = state => state.devices
const getDevicesIgnoreKeys = () => ['loading', 'error']
const getDevicesOnly = createSelector(getDevices, getDevicesIgnoreKeys, (devices, ignore) => Object.keys(devices).reduce((obj, key) => {
  if (ignore.indexOf(key) === -1) {
    return {
      ...obj,
      [key]: devices[key]
    }
  }
  return obj
}))
export const devicesList = createSelector(getDevicesOnly, devices => Object.values(devices))
export const devicesActivity = createSelector(getDevicesOnly, devices => devices.map(loading).length > 0)

const getUser = state => state.user
export const userActivity = createSelector(getUser, user => user.loading || !user.rehydrated)

export const networkActivity = createSelector(userActivity, devicesActivity, (userA, devicesA) => userA || devicesA)
