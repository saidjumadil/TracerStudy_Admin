/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
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

  public async FormUbahPassword({ auth, view }) {
    await auth.authenticate()
    return view.render('ubah_password')
  }

  public async ActionUbahPassword({ request, session, auth, response }) {
    try {
      const user = await auth.authenticate()
      //cek perubahan password
      let cek_perubahan_password = await User.cek_perubahan_password(user.username)
      let jumlah_ubah_password = cek_perubahan_password.password_jumlah_terakhir_reset
      //waktu yg dizinkan untuk mengubah password
      var waktu_diizinkan_ubah = new Date(cek_perubahan_password.password_terakhir_reset)
      waktu_diizinkan_ubah.setHours(waktu_diizinkan_ubah.getHours() + 24) //set 24 jam kemudian
      //get waktu skrg
      const get_time_now = Date.now()
      var waktu_sekarang = new Date(get_time_now)
      //if not admin maka cuma boleh ubah password maksimal 2 kali 1x24jam
      if (
        user.legacy_role > 2 &&
        waktu_sekarang < waktu_diizinkan_ubah &&
        cek_perubahan_password.password_jumlah_terakhir_reset < 2
      ) {
        message(
          session,
          'notification',
          'danger',
          'Tidak dapat mengubah password, silahkan coba lagi pada ' +
            waktu_diizinkan_ubah +
            '. Password hanya dapat diganti 2 kali dalam 1x24 jam'
        )
        return response.redirect('back')
      }

      const { password_lama, password_baru, konfirmasi_password } = request.all()
      const verify = await Hash.verify(user.password, password_lama)
      const hash_password = await Hash.make(password_baru)
      if (verify && password_baru === konfirmasi_password) {
        await User.ubah_password(user.username, hash_password)
        //klo uda 2 kali dan hari sudah berganti maka izinkan ubah password dan set jumlah ubah jadi 0
        if (waktu_sekarang > waktu_diizinkan_ubah && jumlah_ubah_password >= 2) {
          //reset jumlah ubah ke 0
          await User.reset_jumlah(user.username)
          //set jumlah ubah password
          await User.jumlah_ubah_password(user.username, waktu_sekarang, jumlah_ubah_password + 1)
          message(session, 'notification', 'success', 'Password berhasil diubah')
          return response.redirect('back')
        } else {
          await User.jumlah_ubah_password(user.username, waktu_sekarang, jumlah_ubah_password + 1)
          message(session, 'notification', 'success', 'Password berhasil diubah')
          return response.redirect('back')
        }
      } else if (password_baru !== konfirmasi_password) {
        message(session, 'notification', 'danger', 'Kata sandi konfirmasi tidak sama')
        return response.redirect('back')
      } else if (!verify) {
        message(session, 'notification', 'danger', 'Kata sandi lama salah')
        return response.redirect('back')
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'ActionUbahPassword', error.toString(), request.ip())
      message(session, 'notification', 'danger', 'Gagal Mengubah Kata Sandi')
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
