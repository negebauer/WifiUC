import {combineReducers} from 'redux'
import user from './user'
import devices from './devices'

const wifiuc = combineReducers({user, devices})

export default wifiuc
