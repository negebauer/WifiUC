import * as user from './'

const userData = {
  username: 'test',
  password: 'pass'
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
