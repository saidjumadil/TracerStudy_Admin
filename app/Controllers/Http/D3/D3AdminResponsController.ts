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
//TODO : tambahkan dropdown periode
  public async pengisi({ view, auth }) {
    await auth.authenticate()
    const GetFakultas = await Services.get_fakultas()
    return view.render('d3/data/pengisi', { GetFakultas })
  }

  public async hasil({ view, auth }) {
    await auth.authenticate()
    return view.render('d3/data/hasil')
  }

  public async importuser({ view, auth }) {
    await auth.authenticate()

    return view.render('d3/data/import_user')
  }

  //TODO : tambahkan dropdown periode dan routes
  //import user store
  public async store_monitoring({request, session}){
    try {
     let {tahun, periode} = request.all()
      let tahun_monitoring = tahun.concact(periode)
      //function store
      const store_monitoring = await Services.insert_monitoring(tahun_monitoring) 
      if(store_monitoring){
        return { isSuccess: true, message: 'Berhasil import data monitoring' }
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'store_monitoring', error.toString(), request.ip())
      message(session, 'notification_sasaran', 'danger', 'Gagal import data monitoring')
      return { isSuccess: false }
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
