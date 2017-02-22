import * as devices from './'

const device1 = {
  mac: 'AA-AA-AA-AA-AA-AA',
  name: 'device1',
  active: false
}

const device2 = {
  mac: 'BB-BB-BB-BB-BB-BB',
  name: 'device2',
  active: false
}

const device3 = {
  mac: 'CC-CC-CC-CC-CC-CC',
  name: 'device3',
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
    expect(devices.devicesRefresh([device1, device3])).toEqual({
      type: devices.DEVICES_REFRESH,
      devices: [device1, device3]
    })
  })
})
