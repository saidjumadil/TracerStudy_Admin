/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Services from 'App/Models/D3/D3Services'
import ErrorLog from 'App/Models/ErrorLog'
import Hash from '@ioc:Adonis/Core/Hash'
import { message } from 'App/Global'

const className: string = 'D3AdminUserManagemenController' //sesuaikan
const renderName: string = 'd3' //sesuikan

export default class D3AdminUserManagemenController {
  public async view_tambah_responden({ view }) {
    const tahunSasaran = await Services.get_sasaran()
    return view.render(renderName + '/managemen/tambah_akunresponden',{tahunSasaran})
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
      console.log(nim)
      console.log(email)
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
    const RouteActionSearch = `admin.${renderName}.get_responden`
    return view.render(renderName + '/managemen/edit_akunresponden', { RouteActionSearch,tahunSasaran })
  }
}
