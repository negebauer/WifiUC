import {LOGIN, LOGOUT, USER_UPDATE} from '../../actions'

const initialUser = {
  username: '',
  password: '',
  isLogged: false,
  isLogging: false,
  error: ''
}

const login = (state, action) => {
  const value = {
    ...state,
    ...action.user
  }
  return value
}

const logout = (state, action) => {
  const logout = {
    username: '',
    password: '',
    isLogged: false,
    isLogging: false
  }
  return {
    ...state,
    ...logout
  }
}

const userUpdate = (state, action) => {
  return {
    ...state,
    ...action.user
  }
}

const user = (state = initialUser, action) => {
  switch (action.type) {
    case LOGIN:
      return login(state, action)
    case LOGOUT:
      return logout(state, action)
    case USER_UPDATE:
      return userUpdate(state, action)
    default:
      return state
  }
}

export default user
