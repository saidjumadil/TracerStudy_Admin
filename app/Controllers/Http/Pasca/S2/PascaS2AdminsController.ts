/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import Services from 'App/Models/Pasca/S2/PascaS2Services' // sesuaikan
import ErrorLog from 'App/Models/ErrorLog'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'
import { message } from 'App/Global'

const subfolder: string = `/${Env.get('PREFIX')}`
const className: string = 'PascaS2AdminsController' //sesuaikan
const renderName: string = 'pasca/s2' //sesuaikan
const routeName: string = 'pasca.s2' //sesuaikan
let alumni = Env.get('WS_ALUMNI_PASCA_S2') //sesuaikan

export default class PascaS2AdminsController {
  public async index({ view, auth }) {
    await auth.authenticate()
    const tahunSasaran = await Services.get_sasaran()
    const role = auth.user.role
    const nim = auth.user.nim
    let prodi_kajur = ""
    
    if(role == 3){
      prodi_kajur = await Services.get_kajur_prodi(nim)
      console.log(prodi_kajur)
    }

    // message(session)
    const sasaran = await Services.get_sasaran()
    const RouteActionDataIndex: string = `admin.${routeName}.get_data_index`
    console.log(sasaran);
    

    return view.render(renderName + '/index', { sasaran, RouteActionDataIndex, tahunSasaran })
  }

  public async ajax_data_index({ request, session, response }) {
    try {
      const { tahun, periode } = request.all()
      let get_list_kd_fjjp7 = await Services.get_list_kdfjjp7()
      console.log(get_list_kd_fjjp7)
      let arr_kd_fjjp7: Array<any> = []
      //parsing ke arry
      for (let i = 0; i < get_list_kd_fjjp7.length; i++) {
        arr_kd_fjjp7.push(get_list_kd_fjjp7[i].kd_fjjp7)
      }

      const get_data = await Services.get_data_index(tahun, periode, arr_kd_fjjp7)
      console.log('data: ' + JSON.stringify(get_data[0]))

      return { get_data }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'cek_populasi', error.toString(), request.ip())
      message(
        session,
        'notification_sasaran',
        'danger',
        'Gagal mengambil data populasi sasaran Tracer Study'
      )
      return response.redirect('back')
    }
  }

  public async sasaran({ view, auth }) {
    console.log("tes")
    await auth.authenticate()
    const get_sasaran = await Services.get_sasaran()
    const cekPopulasiRoute: string = subfolder + '/admin/' + renderName + '/ajax-cek-populasi'
    const getPopulasiRoute: string = subfolder + '/admin/' + renderName + '/ajax-get-populasi'
    const ubahSasaranRoute: string = subfolder + '/admin/' + renderName + '/sasaran'
    const tahunSasaran = await Services.get_sasaran()

    return view.render(renderName + '/sasaran', {
      get_sasaran,
      cekPopulasiRoute,
      getPopulasiRoute,
      ubahSasaranRoute,
      tahunSasaran,
    })
  }

  public async cek_populasi({ request, session, response }) {
    try {
      let { tahun } = request.all()
      let get_populasi = await Services.get_populasi(tahun)

      return { get_populasi }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'cek_populasi', error.toString(), request.ip())
      message(
        session,
        'notification_sasaran',
        'danger',
        'Gagal mengambil data populasi sasaran Tracer Study'
      )
      return response.redirect('back')
    }
  }

  public async insert_populasi({ request, session, response }) {
    try {
      const { tahun } = request.all()
      //get mahasiswa dari API
      response.safeHeader('Content-type', 'application/json')
      let total_inserted = 0
      if (alumni) {
        let get_alumni = alumni.replace('yyyy', tahun)
        //ambil data alumni
        const data = await axios.get(get_alumni)
        const populasi = data.data[0]
        //disini kita akan modifikasi setiap objek yang ada di array dataMappingProdi menggunakan fungsi map
        populasi.map((obj) => {
          if (obj.hasOwnProperty('npm')) {
            //ambil value dari key yang salah
            const val = obj.npm
            //buat key baru yang sesuai
            obj.nim = val
            //delete key yang lama
            delete obj.npm
          }
          if (obj.hasOwnProperty('kode_prodi')) {
            //ambil value dari key yang salah
            const val = obj.kode_prodi
            //buat key baru yang sesuai
            obj.kd_fjjp7 = val
            //delete key yang lama
            delete obj.kode_prodi
          }
        })
        //insert data baru
        const status = await Services.insert_populasi(populasi)
        // cek kalo statusnya tidak 0
        if (status) {
          //tambahkan total_inserted dengan jumlah data yang didapat
          total_inserted += populasi.length
        } else return { isSuccess: false }
        //return jumlah data yang berhasil ditambahkan
        return { isSuccess: true, total_inserted }
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'insert_populasi', error.toString(), request.ip())
      message(session, 'notification_sasaran', 'danger', 'Ada masalah dengan webservice!')
      return { isSuccess: false }
    }
  }

  public async set_sasaran({ request, session }) {
    try {
      let { tahun, periode } = request.all()
      console.log(tahun)
      if(periode.toString() == "1,2,3,4"){
        periode = [0]
      }
      console.log(periode.toString())
      let update
      await Services.off_sasaran()

      for (let period of periode){
        var tahun_periode = tahun.toString().concat(period.toString())
        let current_sasaran = await Services.get_sasaran()
        console.log(current_sasaran)
        //convert sasaran ke number
        // let num_current: number = Number(current_sasaran.tahun)
        // let num_new_sasaran: number = Number(tahun_periode)
        
        let cek_sasaran = await Services.cek_sasaran(tahun_periode)
        console.log(cek_sasaran)
  
        let status_import = 0
        //cek monitoring sudah diimport apa belum
        const get_status_monitoring = await Services.get_status_monitoring(tahun)
        console.log(get_status_monitoring)
        
        //update sasaran
        update = await Services.set_sasaran(tahun_periode, status_import)
      }

      let dataMessage

      if (update) {
        message(
          session,
          'notification_sasaran',
          'success',
          'Berhasil mengubah sasaran Tracer Study'
        )
        dataMessage =  { isSuccess: true, message: 'Berhasil mengubah sasaran Tracer Study' }
      }
      else {
        // await ErrorLog.error_log(className, 'set_sasaran', error.toString(), request.ip())
        message(session, 'notification_sasaran', 'danger', 'Gagal mengubah sasaran Tracer Study')
        dataMessage = { isSuccess: false }
      } 

      return dataMessage
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'set_sasaran', error.toString(), request.ip())
      message(session, 'notification_sasaran', 'danger', 'Gagal mengubah sasaran Tracer Study')
      return { isSuccess: false }
    }
  }

  public async jadwal({ view, auth }) {
    await auth.authenticate()
    const tahunSasaran = await Services.get_sasaran()
    const get_jadwal = await Services.get_jadwal()
    return view.render(renderName + '/jadwal', { get_jadwal, tahunSasaran })
  }

  public async set_jadwal({ request, session, response, auth }) {
    await auth.authenticate()
    try {
      const { waktu_mulai, waktu_berakhir } = request.all()
      let begin = new Date(waktu_mulai)
      let end = new Date(waktu_berakhir)
      const update_jadwal = await Services.set_jadwal(begin, end)
      if (update_jadwal) {
        message(session, 'notification_jadwal', 'success', 'Berhasil mengubah jadwal Tracer Study')
        return response.redirect('back')
      }
    } catch (error) {
      console.log(error)
      // await ErrorLog.error_log(className, 'set_jadwal', error.toString(), request.ip())
      message(session, 'notification_jadwal', 'danger', 'Gagal mengubah jadwal Tracer Study')
      return response.redirect('back')
    }
  }
}
