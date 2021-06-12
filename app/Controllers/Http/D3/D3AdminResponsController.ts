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

  //TODO: buat routes ajax untuk mengambil data pengisi
  public async get_data_pengisi({request}){
    try {
      const { tahun, periode, kd_fjjp7 } = request.all()
      const get_data_pengisi = await Services.get_data_pengisi(tahun, periode, kd_fjjp7 )
      return {get_data_pengisi}
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'get_data_pengisi', error.toString(), request.ip())
    }
  }

  public async hasil({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/data/hasil')
  }

  //TODO: hapus dropdown tahun dan periode
  public async importuser({ view, auth }) {
    await auth.authenticate()

    return view.render(renderName + '/data/import_user')
  }

  public async store_monitoring({ request, response, session }) {
    try {
      //get tahun dari tabel sasaran sasaran
      const tahun = await Services.get_sasaran()
      let tahun_monitoring = tahun.tahun.substring(0,4)
      const get_import_status = await Services.get_import_status(tahun_monitoring)
      if(get_import_status){
          message(session, 'notification', 'warning', 'Data monitoring sudah pernah diimport!')
          return response.redirect('back')
      }
      // FIXME: lakukan pengecekan monitoring. dikarenakan data akan terus masuk secara duplikat jika user memilih tahun dan periode yang sama
      const store_monitoring = await Services.insert_monitoring(tahun_monitoring)
      if (store_monitoring) {
        //update status user monitoring untuk sasaran
        await Services.update_status_monitoring()
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

  //versi lama
  // public async store_monitoring({ request, response, session }) {
  //   try {
  //     const { tahun, periode } = request.all()
  //    // const tahun_monitoring = `${tahun}${periode}`
  //     //function untuk ngecek data sudah pernah diimport atau belum
  //     const get_import_status = await Services.get_import_status(tahun, periode)
  //     if(get_import_status){
  //       if(periode==="0"){
  //         message(session, 'notification', 'warning', 'Tidak dizinkan import data monitoring, karena beberapa periode sudah pernah diimport! Silahkan pilih periode lainnya!')
  //         return response.redirect('back')
  //       }else{
  //         message(session, 'notification', 'warning', 'Data monitoring sudah pernah diimport!')
  //         return response.redirect('back')
  //       }
  //     }
  //     // FIXME: lakukan pengecekan monitoring. dikarenakan data akan terus masuk secara duplikat jika user memilih tahun dan periode yang sama
  //     const store_monitoring = await Services.insert_monitoring(tahun, periode)
  //     if (store_monitoring) {
  //       //update status user monitoring untuk sasaran
  //       await Services.update_status_monitoring()
  //       message(session, 'notification', 'success', 'Berhasil import data monitoring')
  //       return response.redirect('back')
  //     }
  //     message(session, 'notification', 'danger', 'Gagal import data monitoring')
  //     return response.redirect('back')
  //   } catch (error) {
  //     console.log(error)
  //     await ErrorLog.error_log(className, 'store_monitoring', error.toString(), request.ip())
  //     message(session, 'notification', 'danger', 'Gagal import data monitoring')
  //     return response.redirect('back')
  //   }
  // } 

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
