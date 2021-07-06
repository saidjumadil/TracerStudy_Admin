/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import Services from 'App/Models/Pasca/S2/PascaS2Services'
import ErrorLog from 'App/Models/ErrorLog'
import Hash from '@ioc:Adonis/Core/Hash'
import { message } from 'App/Global'

const className: string = 'PascaS2AdminUserManagemenController' //sesuaikan
const renderName: string = 'pasca/s2' //sesuaikan
const routeName: string = 'pasca.s2' //sesuaikan

export default class PascaS2AdminUserManagemenController {
  public async view_tambah_responden({ view }) {
    const tahunSasaran = await Services.get_sasaran()
    return view.render(renderName + '/managemen/tambah_akunresponden', { tahunSasaran })
  }

  public async insert_responden({ request, response, session }) {
    try {
      const { nim } = request.all()
      //cek nim di table populasi
      let cek_nim = await Services.get_validasi_nim(nim)
      if (cek_nim) {
        const hash_password = await Hash.make(nim)
        const password_clear = nim
        //insert users
        await Services.create_responden(
          nim,
          cek_nim.nama_mhs,
          cek_nim.periode,
          password_clear,
          hash_password
        )
        message(
          session,
          'notification',
          'success',
          'Berhasil menambah akun responden, password adalah NPM'
        )
        return response.redirect('back')
      } else {
        message(session, 'notification', 'danger', 'NPM tidak valid')
        return response.redirect('back')
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'insert_responden', error.toString(), request.ip())
      message(session, 'notification', 'danger', 'Gagal menambah akun responden')
      return response.redirect('back')
    }
  }

  public async ajax_get_responden({ request }) {
    try {
      const { nim } = request.all()
      const responden = await Services.get_responden(nim)
      return { responden }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'get_responden', error.toString(), request.ip())
      return { responden: [] }
    }
  }

  public async edit_responden({ request, response, session }) {
    try {
      const { nim, email } = request.all()
      //cek email sudah dipakai atau belum
      const cek_email = await Services.get_availabe_email(email)
      //jika email sudah terpakai maka tidak dizinkan daftar
      if (cek_email) {
        message(session, 'notification', 'danger', 'email sudah pernah digunakan!')
        return response.redirect('back')
      }
      const edit = await Services.edit_responden(nim, email)
      if (edit) {
        message(session, 'notification', 'success', 'Berhasil mengubah email')
        return response.redirect('back')
      }
      message(session, 'notification', 'danger', 'Gagal mengubah email')
      return response.redirect('back')
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'edit_responden', error.toString(), request.ip())
      message(session, 'notification', 'danger', 'Gagal mengubah email')
      return response.redirect('back')
    }
  }

  public async edit_dataresponden({ view, auth }) {
    await auth.authenticate()
    const tahunSasaran = await Services.get_sasaran()
    const RouteActionSearch = `admin.${routeName}.get_responden`
    return view.render(renderName + '/managemen/edit_akunresponden', {
      RouteActionSearch,
      tahunSasaran,
    })
  }
}
