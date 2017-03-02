import {Platform} from 'react-native'

const Project = {
  isDev: (process.env.NODE_ENV === 'development'),
  isProd: (process.env.NODE_ENV === 'production'),
  ios: Platform.OS == 'ios'
}

export default Project
