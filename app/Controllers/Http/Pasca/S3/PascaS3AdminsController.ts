/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import Services from 'App/Models/Pasca/S3/PascaS3Services' //FIXME: sesuaikan
import ErrorLog from 'App/Models/ErrorLog'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'

function message(session, nama_notif, type, message) {
  session.flash({
    [nama_notif]: {
      type: type,
      message: message,
    },
  })
}

const className: string = 'PascaS3AdminsController' //FIXME : sesuaikan
const renderName: string = 'pasca/s3'

export default class PascaS3AdminsController {
  public async index({ view, auth }) {
    await auth.authenticate()

    return view.render(renderName + '/index')
  }
  public async pengumuman({ view, auth }) {
    await auth.authenticate()

    return view.render(renderName + '/pengumuman')
  }

  // TODO: backend ubah pengumuman
  public async ubah_pengumuman({ response, request, auth }) {
    await auth.authenticate()
    // const {
    //   path_banner,
    //   pengumuman,
    //   laporan_online,
    //   tujuan,
    //   target_responden,
    //   jadwal,
    //   hubungi_kami,
    // } = request.all()
    console.log(request.all())
    return response.redirect('back')
  }
  public async sasaran({ view, auth }) {
    await auth.authenticate()
    const get_sasaran = await Services.get_sasaran()
    const cekPopulasiRoute: string = '/admin/' + renderName + '/ajax-cek-populasi'
    const getPopulasiRoute: string = '/admin/' + renderName + '/ajax-get-populasi'
    const ubahSasaranRoute: string = '/admin/' + renderName + '/sasaran'

    return view.render(renderName + '/sasaran', {
      get_sasaran,
      cekPopulasiRoute,
      getPopulasiRoute,
      ubahSasaranRoute,
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
      let alumni = Env.get('WS_ALUMNI_PASCA_S3')
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
        }

        //return jumlah data yang berhasil ditambahkan
        return { total_inserted }
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'insert_populasi', error.toString(), request.ip())
      message(session, 'notification_sasaran', 'danger', 'Ada masalah dengan webservice!')
      return response.redirect('back')
    }
  }

  public async set_sasaran({ request, session }) {
    try {
      let { tahun, periode } = request.all()
      var tahun_periode = tahun.toString().concat(periode.toString())
      let current_sasaran = await Services.get_sasaran()      
      //covert sasaran ke number
      let num_current: number = Number(current_sasaran.tahun)
      let num_new_sasaran : number = Number(tahun_periode)
      //cek sasaran sesuai aturan atau tidak
      let cek_sasaran = await Services.cek_sasaran(tahun_periode)
      // jika cek sasaran false dan tahun sasaran baru > tahun sasaran sekarang maka izinkan untuk update tahun sasaran
      if(!cek_sasaran && num_new_sasaran > num_current){
        //update sasaran
        let update = await Services.set_sasaran(tahun_periode)
        if (update) {
          message(
            session,
            'notification_sasaran',
            'success',
            'Berhasil mengubah sasaran Tracer Study'
          )
          return { isSuccess: true }
        }
      }else{
        message(
          session,
          'notification_sasaran',
          'danger',
          'Gagal mengubah karena sasaran sudah pernah dibuat!'
        )
        return { isSuccess: false }
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

    const get_jadwal = await Services.get_jadwal()
    return view.render(renderName + '/jadwal', { get_jadwal })
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
