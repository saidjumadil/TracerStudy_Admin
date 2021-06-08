/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
// import { Hash } from '@adonisjs/core/build/standalone'
import Hash from '@ioc:Adonis/Core/Hash'
import ErrorLog from 'App/Models/ErrorLog'
import User from 'App/Models/User'
import randomstring from 'randomstring'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
const className: string = 'OperatorController'

function message(session, nama_notif, type, message) {
  session.flash({
    [nama_notif]: {
      type: type,
      message: message,
    },
  })
}
export default class OperatorController {
  public async operator({ auth, view }) {
    await auth.authenticate()
    return view.render('operator/operator')
  }

  // TODO: backend ubah operator
  public async ubah_operator({ auth, response, request }) {
    await auth.authenticate()

    return response.redirect().toRoute('admin.operator')
  }
  // TODO: backend tambah operator
  public async store_operator({ auth, response, request }) {
    await auth.authenticate()
    const { nama, username, email, jabatan, permission } = request.all()
    console.log(request.all())
    return response.redirect().toRoute('admin.operator')
  }
  //TODO: PENTING!!! seseuaikan nama notifikasi di edge dan pada conttroller sesuai kebutuhan

  //TODO: hubungkan routes dengan view
  public async get_operator({ view, auth }) {
    await auth.authenticate()
    const users = User.get_users()
    return view.render('d3/managemen/tambah_operator', { users })
    //TODO: buat dulu edge untuk form operator
  }

  //TODO: buat routes action form untuk store akun
  public async register_users({ request, session, response }) {
    try {
      let {
        username,
        nama,
        email,
        password,
        permission_d3,
        permission_pasca_s2,
        permission_pasca_s3,
        permission_profesi,
      } = request.all()

      const hash_password = await Hash.make(password)
      //insert users
      const insert_users = await User.insert_users(
        username,
        nama,
        email,
        hash_password,
        permission_d3,
        permission_pasca_s2,
        permission_pasca_s3,
        permission_profesi
      )
      if (insert_users) {
        // kirim email
        const emailData = {
          nama: nama,
          username: username,
          password: password,
        }

        const kirimEmail = await Mail.send((message) => {
          message
            .to(email)
            .from(Env.get('MAIL_USERNAME'), Env.get('MAIL_PASSWORD'))
            .subject('Konfirmasi Akun Operator Tracer Study Universitas Syiah Kuala')
            .htmlView('email/konfirmasi', emailData)
        })

        if (!kirimEmail) {
          message(session, 'notification_user', 'danger', 'gagal mengirim email!')
          return response.redirect('back')
        }
      }
      message(session, 'notification_user', 'success', 'Berhasil menambah akun ' + nama)
      return response.redirect('back')
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'register_users', error.toString(), request.ip())
      message(session, 'notification_user', 'danger', 'Gagal mengubah jadwal Tracer Study')
      return response.redirect('back')
    }
  }

  //TODO: buat routes action form untuk edit role dsb
  public async update_users({ request, session, response }) {
    try {
      const {
        username,
        nama,
        permission_d3,
        permission_pasca_s2,
        permission_pasca_s3,
        permission_profesi,
      } = request.all()
      const update_akun = await User.update_users(
        username,
        nama,
        permission_d3,
        permission_pasca_s2,
        permission_pasca_s3,
        permission_profesi
      )
      if (update_akun) {
        message(session, 'notification', 'success', 'Berhasil memperbarui akun ' + nama)
        return response.redirect('back')
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'update_users', error.toString(), request.ip())
      message(session, 'notification', 'danger', 'Gagal memperbarui data')
      return response.redirect('back')
    }
  }

  //TODO: buat routes dan view untuk reset password akun (function ini untuk admin mereset operator atau operator reset password melalui lupa password)
  //jadi funtion ini dipakai pada 2 halaman berbeda
  public async reset_password({ request, session, response }) {
    try {
      const { username_lupapassword, email_lupapassword } = request.all()
      //cek username dan email valid atau tidak
      const get_akun = await User.get_available_users(username_lupapassword, email_lupapassword)
      if (get_akun[0]) {
        const passwordClear = this.generate_password()
        const hashPassword = await Hash.make(passwordClear)
        //reset password
        await User.ubah_password(username_lupapassword, hashPassword)
        // kirim email
        const emailData = {
          nama: get_akun[0].nama,
          username: username_lupapassword,
          password: passwordClear,
        }

        const kirimEmail = await Mail.send((message) => {
          message
            .to(email_lupapassword)
            .from(Env.get('MAIL_USERNAME'), Env.get('MAIL_PASSWORD'))
            .subject('Konfirmasi Reset Password Operator Tracer Study Universitas Syiah Kuala')
            .htmlView('email/lupa_password', emailData)
        })

        if (!kirimEmail) {
          message(session, 'notification', 'danger', 'gagal mengirim email!')
          return response.redirect('back')
        }

        message(
          session,
          'notification',
          'success',
          'password anda berhasil direset, silahkan cek email anda!'
        )
        return response.redirect('back')
      } else {
        message(session, 'notification', 'warning', 'NPM atau email! belum terdaftar!')
        return response.redirect('back')
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'forget_password', error.toString(), request.ip())
      message(session, 'notification', 'danger', 'Gagal mengubah password')
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
}
