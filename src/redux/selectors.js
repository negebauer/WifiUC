import {createSelector} from 'reselect'

export const devicesList = state => Object.values({
  ...state.devices,
  loading: null,
  error: null
}).filter(Boolean)

export const devicesActivity = state => state.devices.loading || devicesList(state).map(device => device.loading).length > 0
export const userActivity = state => state.user.loading || !state.user.rehydrated
export const networkActivity = state => userActivity(state) || devicesActivity(state)
