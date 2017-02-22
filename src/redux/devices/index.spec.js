import * as devices from './'

const device1 = {
  mac: 'AA-AA-AA-AA-AA-AA',
  name: 'device1',
  active: false
}

const device2 = {
  mac: 'BB-BB-BB-BB-BB-BB',
  name: 'device2',
  active: true
}

describe('devices actions', () => {
  it('deviceToggle should create DEVICE_TOGGLE action', () => {
    expect(devices.deviceToggle(device1.mac, true)).toEqual({type: devices.DEVICE_TOGGLE, mac: device1.mac, active: true})
  })

  it('deviceAdd should create DEVICE_ADD action', () => {
    expect(devices.deviceAdd(device1)).toEqual({type: devices.DEVICE_ADD, device: device1})
  })

  it('deviceEditName should create DEVICE_EDIT_NAME action', () => {
    expect(devices.deviceEditName(device1.mac, 'changed')).toEqual({type: devices.DEVICE_EDIT_NAME, mac: device1.mac, name: 'changed'})
  })

  it('deviceRemove should create DEVICE_REMOVE action', () => {
    expect(devices.deviceRemove(device1.mac)).toEqual({type: devices.DEVICE_REMOVE, mac: device1.mac})
  })

  it('devicesRefresh should create DEVICES_REFRESH action', () => {
    expect(devices.devicesRefresh([device1, device2])).toEqual({
      type: devices.DEVICES_REFRESH,
      devices: [device1, device2]
    })
  })
})

describe('devices reducer', () => {
  it('should handle initial state', () => {
    expect(devices.default(undefined, {})).toEqual(devices.initialState)
  })

  it('should handle DEVICE_TOGGLE', () => {
    expect(devices.default({
      [device1.mac]: device1
    }, devices.deviceToggle(device1.mac, true))).toEqual({
      [device1.mac]: {
        ...device1,
        active: true
      }
    })
  })

  it('should handle DEVICE_ADD', () => {
    expect(devices.default({}, devices.deviceAdd(device1))).toEqual({
      [device1.mac]: device1
    })
  })

  it('should handle DEVICE_EDIT_NAME', () => {
    expect(devices.default({
      [device1.mac]: device1
    }, devices.deviceEditName(device1.mac, 'changed'))).toEqual({
      [device1.mac]: {
        ...device1,
        name: 'changed'
      }
    })
  })

  it('should handle DEVICE_REMOVE', () => {
    expect(devices.default({
      [device1.mac]: device1
    }, devices.deviceRemove(device1.mac))).toEqual({})
  })

  it('should handle DEVICES_REFRESH', () => {
    expect(devices.default({}, devices.devicesRefresh([device1, device2]))).toEqual({
      [device1.mac]: device1,
      [device2.mac]: device2
    })
  })
})
