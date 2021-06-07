/* eslint-disable prettier/prettier */
import ErrorLog from 'App/Models/ErrorLog'

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

    return response.redirect().toRoute('admin.operator')
  }
}
