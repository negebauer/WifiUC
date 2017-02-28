import * as newDevice from './'

const newDeviceData = {
  name: 'Test',
  mac: 'AA:AA:AA:AA:AA:CC',
  error: ''
}

describe('newDevice actions', () => {
  it('update should create NEW_DEVICE_UPDATE action', () => {
    expect(newDevice.update(newDeviceData)).toEqual({type: newDevice.UPDATE, device: newDeviceData})
  })
})

describe('newDevice reducer', () => {
  it('should handle initialState', () => {
    expect(newDevice.default(undefined, {})).toEqual(newDevice.initialState)
  })

  it('should handle NEW_DEVICE_UPDATE', () => {
    expect(newDevice.default({}, newDevice.update(newDeviceData))).toEqual({
      ...newDeviceData
    })
  })
})
