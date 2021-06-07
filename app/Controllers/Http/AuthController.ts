/* eslint-disable @typescript-eslint/naming-convention *//* eslint-disable prettier/prettier */
import ErrorLog from 'App/Models/ErrorLog'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

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

  public async authentication({ auth, request, response, session }) {
    try {
      const { username, password } = request.all()
      const user = await auth.attempt(username, password)
      if (user) {
        return response.redirect().toRoute('admin.d3.index')
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

  //TODO: hubungkan route dengan edge ubah password
  public async FormUbahPassword({ view }) {
    return view.render("");
  }

  //TODO: hubungkan route dengan action form
  public async ActionUbahPassword({ request, session, auth, response }) {
    try {
      const user = await auth.authenticate()
      const { password_lama, password_baru, konfirmasi_password } = request.all();
      const verify = await Hash.verify(password_lama, user.password);
      const hash_password = await Hash.make(password_baru)
      if (verify && password_baru === konfirmasi_password) {
        await User.ubah_password(user.username, hash_password)

        message(
          session,
          'notification',
          'danger',
          'Password berhasil diubah'
        )
        return response.redirect('back')
      } else if (password_baru !== konfirmasi_password) {
        message(
          session,
          'notification',
          'danger',
          'Kata sandi konfirmasi tidak sama'
        )
        return response.redirect('back')
      } 
    } catch (error) {
      console.log(error);
      await ErrorLog.error_log(className, 'ActionUbahPassword', error.toString(), request.ip())
      message(
        session,
        'notification',
        'danger',
        'Gagal Mengubah Kata Sandi'
      )
      return response.redirect('back')
    }
  }

  

  public async logout({ auth, response }) {
    try {
      await auth.logout()
      console.log('tes')
      return response.redirect().toRoute('auth.login')
    } catch (e) {
      console.log(e)
    }
  }
}
