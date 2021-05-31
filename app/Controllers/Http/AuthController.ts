/* eslint-disable prettier/prettier */
import ErrorLog from "App/Models/ErrorLog"

const className: string = 'AuthController'

function message(session, nama_notif, type, message) {
  session.flash({
    [nama_notif]: {
      type: type,
      message: message,
    },
  })
}
export default class AuthController {
  public index({ view }) {
    return view.render('login')
  }

  public async authentication({ auth, request, response , session}) {
      try {
      const { username, password } = request.all()
      const user = await auth.attempt(username, password)
      if (user) {
      //TODO: halaman cek midleware 
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'authentication', error.toString(), request.ip())
      message(
        session,
        'notification_login',
        'danger',
        'Password atau username salah atau Akun sedang login pada perangkat lain'
      )
      return response.redirect('back')
    }
  }

  public async logout({ auth, response }) {
    try {
      await auth.logout()
      return response.redirect().toRoute('auth.login')
    } catch (e) {
      console.log(e)
    }
  }
}
