import {combineReducers} from 'redux'
import user from './user'
import devices from './devices'
import newDevice from './newDevice'

const wifiuc = combineReducers({user, devices, newDevice})

export default wifiuc
