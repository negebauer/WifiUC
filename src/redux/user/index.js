export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const USER_UPDATE = 'USER_UPDATE'

export const login = user => {
  return {type: LOGIN, user}
}

export const logout = user => {
  return {type: LOGOUT, user}
}

export const userUpdate = user => {
  return {type: USER_UPDATE, user}
}

export const initialState = {
  username: '',
  password: '',
  isLogged: false,
  isLogging: false,
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case USER_UPDATE:
      return {
        ...state,
        ...action.user
      }
    case LOGOUT:
      return {
        ...state,
        ...initialState
      }
    default:
      return state
  }
}

export default reducer
