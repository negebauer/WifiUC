import * as devices from './'

const device1 = {
  mac: 'AA-AA-AA-AA-AA-AA',
  name: 'device1',
  active: false,
  loading: false,
  error: ''
}

const device2 = {
  mac: 'BB-BB-BB-BB-BB-BB',
  name: 'device2',
  active: true,
  loading: false,
  error: ''
}

describe('devices actions', () => {
  it('toggle should create TOGGLE action', () => {
    expect(devices.toggle(device1.mac, true, true, 'Test')).toEqual({type: devices.TOGGLE, mac: device1.mac, active: true, loading: true, error: 'Test'})
  })

  it('add should create ADD action', () => {
    expect(devices.add(device1)).toEqual({type: devices.ADD, device: device1})
  })

  it('editName should create EDIT_NAME action', () => {
    expect(devices.editName(device1.mac, 'changed')).toEqual({type: devices.EDIT_NAME, mac: device1.mac, name: 'changed'})
  })

  it('remove should create REMOVE action', () => {
    expect(devices.remove(device1.mac)).toEqual({type: devices.REMOVE, mac: device1.mac})
  })

  it('refresh should create REFRESH action', () => {
    expect(devices.refresh([device1, device2])).toEqual({
      type: devices.REFRESH,
      devices: [device1, device2]
    })
  })
})

describe('devices reducer', () => {
  it('should handle initial state', () => {
    expect(devices.default(undefined, {})).toEqual(devices.initialState)
  })

  it('should handle TOGGLE', () => {
    expect(devices.default({
      [device1.mac]: device1
    }, devices.toggle(device1.mac, true, true, 'Test'))).toEqual({
      [device1.mac]: {
        ...device1,
        active: true,
        loading: true,
        error: 'Test'
      }
    })
  })

  it('should handle ADD', () => {
    expect(devices.default({}, devices.add(device1))).toEqual({
      [device1.mac]: device1
    })
  })

  it('should handle EDIT_NAME', () => {
    expect(devices.default({
      [device1.mac]: device1
    }, devices.editName(device1.mac, 'changed'))).toEqual({
      [device1.mac]: {
        ...device1,
        name: 'changed'
      }
    })
  })

  it('should handle REMOVE', () => {
    expect(devices.default({
      [device1.mac]: device1
    }, devices.remove(device1.mac))).toEqual({})
  })

  it('should handle REFRESH', () => {
    expect(devices.default({}, devices.refresh([
      device1, device2
    ], true, 'Test'))).toEqual({
      [device1.mac]: device1,
      [device2.mac]: device2,
      loading: true,
      error: 'Test'
    })
  })
})
