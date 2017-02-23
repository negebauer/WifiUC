import Session from '../../utils/session'
import Format from '../../utils/format'

const session = user => new Session(user.username, user.password)

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE = 'UPDATE'

export const login = (user, loading, error) => {
  return {type: LOGIN, user, loading, error}
}

export const fetchLogin = user => {
  return dispatch => {
    dispatch(login(user, true, ''))
    return session(user).login().then(() => {
      dispatch(login(user, false, ''))
    }).catch(err => {
      dispatch(login(user, false, err.message))
    })
  }
}

export const logout = () => {
  return {type: LOGOUT}
}

export const fetchLogout = () => {
  return dispatch => {
    dispatch(logout())
    return Session.logout()
  }
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
