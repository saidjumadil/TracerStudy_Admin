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
  public async ajax_get_responden({ request, response, session }) {
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

    const RouteActionSearch = `admin.${renderName}.get_responden`
    return view.render(renderName + '/managemen/edit_akunresponden', { RouteActionSearch })
  }
}
