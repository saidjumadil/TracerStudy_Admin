/* eslint-disable prettier/prettier */
import Services from 'App/Models/D3/D3Services' //FIXME : sesuaikan
import ErrorLog from 'App/Models/ErrorLog'


const className: string = 'D3PengumummanController'

function message(session, nama_notif, type, message) {
  session.flash({
    [nama_notif]: {
      type: type,
      message: message,
    },
  })
}
export default class D3PengumummanController {

    //TODO: hubungkan view dan routes
    public async get_pengumumman({ view, auth }) {
        await auth.authenticate()
        return 

    }
}