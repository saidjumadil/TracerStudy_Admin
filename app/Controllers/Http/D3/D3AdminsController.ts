/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import Services from 'App/Models/D3/D3Services'
import ErrorLog from 'App/Models/ErrorLog'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'
import { message } from 'App/Global'

const className: string = 'D3AdminsController' //sesuaikan
const renderName: string = 'd3' //sesuikan
let alumni = Env.get('WS_ALUMNI_D3') //sesuaikan

export default class D3AdminsController {
  public async index({ view, auth }) {
    await auth.authenticate()
    const tahunSasaran = await Services.get_sasaran()

    // message(session)
    const sasaran = await Services.get_sasaran()
    const RouteActionDataIndex: string = `admin.${renderName}.get_data_index`

    return view.render(renderName + '/index', { sasaran, RouteActionDataIndex,tahunSasaran })
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
    await auth.authenticate()
    const get_sasaran = await Services.get_sasaran()
    const cekPopulasiRoute: string = '/admin/' + renderName + '/ajax-cek-populasi'
    const getPopulasiRoute: string = '/admin/' + renderName + '/ajax-get-populasi'
    const ubahSasaranRoute: string = '/admin/' + renderName + '/sasaran'
    const tahunSasaran = await Services.get_sasaran()

    return view.render(renderName + '/sasaran', {
      get_sasaran,
      cekPopulasiRoute,
      getPopulasiRoute,
      ubahSasaranRoute,
      tahunSasaran
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
        alumni = alumni.replace('yyyy', tahun)
        //ambil data alumni
        const data = await axios.get(alumni)
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
      var tahun_periode = tahun.toString().concat(periode.toString())
      let current_sasaran = await Services.get_sasaran()
      //convert sasaran ke number
      if (current_sasaran) {
        let num_current: number = Number(current_sasaran.tahun)
        let num_new_sasaran: number = Number(tahun_periode)
        //cek sasaran sesuai aturan atau tidak
        let cek_sasaran = await Services.cek_sasaran(tahun_periode)
        // jika cek sasaran false dan tahun sasaran baru > tahun sasaran sekarang maka izinkan untuk update tahun sasaran
        if (!cek_sasaran && num_new_sasaran > num_current) {
          let status_import = 0
          //cek monitoring sudah diimport apa belum
          const get_status_monitoring = await Services.get_status_monitoring(tahun)
          if (get_status_monitoring) {
            status_import = 1
          }
          //update sasaran
          let update = await Services.set_sasaran(tahun_periode, status_import)
          if (update) {
            message(
              session,
              'notification_sasaran',
              'success',
              'Berhasil mengubah sasaran Tracer Study'
            )
            return { isSuccess: true, message: 'Berhasil mengubah sasaran Tracer Study' }
          }
        } else {
          message(
            session,
            'notification_sasaran',
            'danger',
            'Gagal mengubah karena sasaran sudah pernah dibuat!'
          )
          return { isSuccess: false }
        }
      } else {
        let status_import = 0
        //cek monitoring sudah diimport apa belum
        const get_status_monitoring = await Services.get_status_monitoring(tahun)
        if (get_status_monitoring) {
          status_import = 1
        }
        //update sasaran
        let update = await Services.set_sasaran(tahun_periode, status_import)
        if (update) {
          message(
            session,
            'notification_sasaran',
            'success',
            'Berhasil mengubah sasaran Tracer Study'
          )
          return { isSuccess: true, message: 'Berhasil mengubah sasaran Tracer Study' }
        } else {
          message(
            session,
            'notification_sasaran',
            'danger',
            'Gagal mengubah karena sasaran sudah pernah dibuat!'
          )
        }
      }
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
    return view.render(renderName + '/jadwal', { get_jadwal,tahunSasaran })
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
      await ErrorLog.error_log(className, 'set_jadwal', error.toString(), request.ip())
      message(session, 'notification_jadwal', 'danger', 'Gagal mengubah jadwal Tracer Study')
      return response.redirect('back')
    }
  }
}
