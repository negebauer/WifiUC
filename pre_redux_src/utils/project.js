export default class Project {
  static isDev = (process.env.NODE_ENV === 'development')
  static isProd = (process.env.NODE_ENV === 'production')
}
