import Project from './project'

export default class Utils {
  static logRender = (component) => {
    if (!Project.isDev) {
      return
    }
    console.log(component.props.title)
    console.log(component.state)
    // console.log(component.props)
  }
}
