/* eslint-disable prettier/prettier */

import Services from 'App/Models/D3/D3Services'
import ErrorLog from 'App/Models/ErrorLog'

const className: string = 'D3AdminUserManagemenController' //sesuaikan
const renderName: string = 'd3' //sesuikan

function message(session, nama_notif, type, message) {
  session.flash({
    [nama_notif]: {
      type: type,
      message: message,
    },
  })
}

export default class D3AdminUserManagemenController {
  public async tambah_admin({ view, auth }) {
    await auth.authenticate()

    return view.render('d3/managemen/tambah_admin')
  }
  public async tambah_operator({ view, auth }) {
    await auth.authenticate()

    return view.render('d3/managemen/tambah_operator')
  }

  //TODO: return ke halaman tempat edit email
  public static async ajax_get_responden({ request, response, session }) {
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
  //TODO: Hubungkan backend edit email
  public static async edit_responden({ request, response, session }) {
    try {
      const { nim, email } = request.all()
      const edit = await Services.edit_responden(nim, email)
      if (edit) {
        message(session, 'notificaton', 'success', 'Berhasil mengubah email')
        return response.redirect('back')
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'edit_responden', error.toString(), request.ip())
      return response.redirect('back')
    }
  }

  //yg bawah ini nga pake
  public async tambah_akunresponden({ view, auth }) {
    await auth.authenticate()

    return view.render('d3/managemen/tambah_akunresponden')
  }
  public async edit_dataresponden({ view, auth }) {
    await auth.authenticate()

    return view.render('d3/managemen/edit_dataresponden')
  }
}
