import * as newDevice from './'

const newDeviceData = {
  name: 'Test',
  mac: 'AA:AA:AA:AA:AA:CC'
}

describe('newDevice actions', () => {
  it('newDeviceUpdate should create NEW_DEVICE_UPDATE action', () => {
    expect(newDevice.newDeviceUpdate(newDeviceData)).toEqual({type: newDevice.NEW_DEVICE_UPDATE, device: newDeviceData})
  })
})

describe('newDevice reducer', () => {
  it('should handle initialState', () => {
    expect(newDevice.default(undefined, {})).toEqual(newDevice.initialState)
  })

  it('should handle NEW_DEVICE_UPDATE', () => {
    expect(newDevice.default({}, newDevice.newDeviceUpdate(newDeviceData))).toEqual(newDeviceData)
  })
})
