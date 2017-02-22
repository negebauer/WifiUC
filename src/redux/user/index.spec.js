import * as user from './'

const userData = {
  username: 'test',
  password: 'pass',
  isLogged: false,
  isLogging: false,
  error: ''
}

describe('user actions', () => {
  it('login should create LOGIN action', () => {
    expect(user.login(userData)).toEqual({type: user.LOGIN, user: userData})
  })

  it('logout should create LOGOUT action', () => {
    expect(user.logout()).toEqual({type: user.LOGOUT})
  })

  it('userUpdate should create USER_UPDATE action', () => {
    expect(user.userUpdate(userData)).toEqual({type: user.USER_UPDATE, user: userData})
  })
})

describe('user reducer', () => {
  it('should handle initial state', () => {
    expect(user.default(undefined, {})).toEqual(user.initialState)
  })

  it('should handle LOGIN', () => {
    expect(user.default({}, user.login(userData))).toEqual(userData)
  })

  it('should handle LOGOUT', () => {
    expect(user.default({}, user.logout(userData))).toEqual(user.initialState)
  })

  it('should handle USER_UPDATE', () => {
    expect(user.default({}, user.userUpdate(userData))).toEqual(userData)
  })
})
