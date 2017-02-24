import Session from '../../utils/session'
import Format from '../../utils/format'
import {REHYDRATE} from 'redux-persist/constants'

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

export const logout = (loading, error) => {
  return {type: LOGOUT, loading, error}
}

export const fetchLogout = () => {
  return dispatch => {
    dispatch(logout(true))
    return Session.logout().then(() => dispatch(logout(false, 'Ingresa tus crendenciales')))
  }
}

export const update = user => {
  return {type: UPDATE, user}
}

export const initialState = {
  username: '',
  password: '',
  error: '',
  loading: false,
  rehydrated: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const {loading, error} = action
      return {
        ...state,
        ...action.user,
        loading: action.loading,
        error: action.error
      }
    case UPDATE:
      return {
        ...state,
        ...action.user,
        username: Format.cleanUsername(action.user.username)
      }
    case LOGOUT:
      return {
        ...initialState,
        loading: action.loading,
        error: action.error,
        rehydrated: true
      }
    case REHYDRATE:
      // New user
      if (Object.keys(action.payload).length === 0 && action.payload.constructor === Object) {
        return {
          ...state,
          rehydrated: true
        }
      }
      // Returning user
      const incoming = action.payload.user
      if (incoming) {
        return {
          ...state,
          ...incoming,
          rehydrated: true
        }
      }
      return state
    default:
      return state
  }
}

export default reducer
