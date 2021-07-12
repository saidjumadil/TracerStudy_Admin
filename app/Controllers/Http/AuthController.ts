/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import ErrorLog from 'App/Models/ErrorLog'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import randomstring from 'randomstring'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import { formatDate, message } from 'App/Global'

const className: string = 'AuthController'

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
        cek_perubahan_password.password_jumlah_terakhir_reset >= 2
      ) {
        message(
          session,
          'notification',
          'danger',
          'Tidak dapat mengubah password, silahkan coba lagi pada ' +
            formatDate(waktu_diizinkan_ubah) +
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
          jumlah_ubah_password = 0
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

  public async ActionLupaPassword({ request, response, session }) {
    try {
      const { username_lupapassword, email_lupapassword } = request.all()
      //cek username dan email valid atau tidak
      const get_akun = await User.get_available_users(username_lupapassword, email_lupapassword)
      if (get_akun) {
        //cek perubahan password
        let cek_perubahan_password = await User.cek_perubahan_password(username_lupapassword)
        let jumlah_ubah_password = cek_perubahan_password.password_jumlah_terakhir_reset
        //waktu yg dizinkan untuk mengubah password
        var waktu_diizinkan_ubah = new Date(cek_perubahan_password.password_terakhir_reset)
        waktu_diizinkan_ubah.setHours(waktu_diizinkan_ubah.getHours() + 24) //set 24 jam kemudian
        //get waktu skrg
        const get_time_now = Date.now()
        var waktu_sekarang = new Date(get_time_now)
        //if not admin maka cuma boleh ubah password maksimal 2 kali 1x24jam
        if (
          get_akun.legacy_role > 2 &&
          waktu_sekarang < waktu_diizinkan_ubah &&
          cek_perubahan_password.password_jumlah_terakhir_reset >= 2
        ) {
          message(
            session,
            'notification_lupapassword',
            'danger',
            'Tidak dapat reset password, silahkan coba lagi pada ' +
              formatDate(waktu_diizinkan_ubah) +
              '. Password hanya dapat diganti 2 kali dalam 1x24 jam'
          )
          return response.redirect('back')
        }

        const passwordClear = this.generate_password()
        const hashPassword = await Hash.make(passwordClear)
        //reset password
        await User.ubah_password(username_lupapassword, hashPassword)
        // kirim email
        const emailData = {
          nama: get_akun.nama,
          username: username_lupapassword,
          password: passwordClear,
        }

        //klo uda 2 kali dan hari sudah berganti maka izinkan ubah password dan set jumlah ubah jadi 0
        if (waktu_sekarang > waktu_diizinkan_ubah && jumlah_ubah_password >= 2) {
          //reset jumlah ubah ke 0
          await User.reset_jumlah(username_lupapassword)
          jumlah_ubah_password = 0
        }

        //set jumlah ubah password
        await User.jumlah_ubah_password(
          username_lupapassword,
          waktu_sekarang,
          jumlah_ubah_password + 1
        )

        const kirimEmail = await Mail.send((message) => {
          message
            .to(email_lupapassword)
            .from(Env.get('MAIL_USERNAME'), Env.get('MAIL_PASSWORD'))
            .subject('Konfirmasi Reset Password Operator Tracer Study Universitas Syiah Kuala')
            .htmlView('email/lupa_password', emailData)
        })

        if (!kirimEmail) {
          message(session, 'notification_lupapassword', 'danger', 'gagal mengirim email!')
          return response.redirect('back')
        }

        message(
          session,
          'notification_lupapassword',
          'success',
          'password anda berhasil direset, silahkan cek email anda!'
        )
        return response.redirect('back')
      } else {
        message(
          session,
          'notification_lupapassword',
          'warning',
          'username atau email! belum terdaftar!'
        )
        return response.redirect('back')
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'forget_password', error.toString(), request.ip())
      message(session, 'notification_lupapassword', 'danger', 'gagal mengirim email!')
      return response.redirect('back')
    }
  }

  public generate_password() {
    try {
      return randomstring.generate({
        length: 8,
        charset: '1234567890abcdefghijklmnopqrstuvwxyz',
      })
    } catch (error) {
      console.log(error)
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
