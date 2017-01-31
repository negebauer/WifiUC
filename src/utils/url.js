export default class Url {
  static PORTAL_HOST = 'https://portal.uc.cl'
  static MAC_HOST = Url.PORTAL_HOST + '/LPT028_RegistroMac'

  static login = 'https://sso.uc.cl/cas/login?service=' +
    'https%3A%2F%2Fportal.uc.cl%2Fc%2Fportal%2Flogin'
  static logout = Url.PORTAL_HOST + '/c/portal/logout'
  static render = Url.PORTAL_HOST + '/c/portal/render_portlet?p_l_id=10229&p_p_id=' + 'RegistroMac_WAR_LPT028_RegistroMac_INSTANCE_L0Zr&p_p_lifecycle=0&' + 'p_p_state=normal&p_p_mode=view&p_p_col_id=column-3&p_p_col_pos=1&' + 'p_p_col_count=2&currentURL=%2Fweb%2Fhome-community%2Finicio'
  static getMacList = Url.MAC_HOST + '/GetListaMac_controller'
  static edit = Url.MAC_HOST + '/EditarRegistroMac_controller'
  static remove = Url.MAC_HOST + '/EliminarRegistroMac_controller'
  static add = Url.MAC_HOST + '/AgregarRegistroMac_controller'
  static logged = 'https://portal.uc.cl/web/home-community/inicio'
}
