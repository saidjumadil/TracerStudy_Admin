/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Services from 'App/Models/D3/D3Services'
import ErrorLog from 'App/Models/ErrorLog'

const className: string = 'D3AdminResponsController' //sesuaikan
const renderName: string = 'd3' //sesuikan

function message(session, nama_notif, type, message) {
  session.flash({
    [nama_notif]: {
      type: type,
      message: message,
    },
  })
}

export default class D3AdminResponsController {
  public async pengisi({ view, auth }) {
    await auth.authenticate()
    const GetFakultas = await Services.get_fakultas()
    return view.render(renderName + '/data/pengisi', { GetFakultas })
  }

  public async hasil({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/data/hasil')
  }

  public async importuser({ view, auth }) {
    await auth.authenticate()

    return view.render(renderName + '/data/import_user')
  }

  public async store_monitoring({ request, response, session }) {
    try {
      const { tahun, periode } = request.all()
      const tahun_monitoring = `${tahun}${periode}`

      //function store
      // FIXME: lakukan pengecekan monitoring. dikarenakan data akan terus masuk secara duplikat jika user memilih tahun dan periode yang sama
      const store_monitoring = await Services.insert_monitoring(tahun_monitoring)
      if (store_monitoring) {
        message(session, 'notification', 'success', 'Berhasil import data monitoring')
        return response.redirect('back')
      }
      message(session, 'notification', 'danger', 'Gagal import data monitoring')
      return response.redirect('back')
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'store_monitoring', error.toString(), request.ip())
      message(session, 'notification', 'danger', 'Gagal import data monitoring')
      return response.redirect('back')
    }
  }

  public async ajax_prodi({ request }) {
    try {
      const { id_fakultas } = request.all()
      const GetProdi = await Services.get_prodi(id_fakultas)
      return GetProdi
    } catch (error) {
      console.log(error)
    }
  }
}
