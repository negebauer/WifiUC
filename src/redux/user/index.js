import Format from '../../utils/format'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE = 'UPDATE'

export const login = (user, loading, error) => {
  return {type: LOGIN, user, loading, error}
}

export const logout = user => {
  return {type: LOGOUT, user}
}

export const update = user => {
  return {type: UPDATE, user}
}

export const initialState = {
  username: '',
  password: '',
  loading: false,
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const {loading, error} = action
      return {
        ...state,
        ...action.user,
        loading,
        error
      }
    case UPDATE:
      return {
        ...state,
        ...action.user,
        username: Format.cleanUsername(action.user.username)
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
