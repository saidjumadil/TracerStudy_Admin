/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prettier/prettier */
import Services from 'App/Models/D3/D3Services'
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

const className: string = 'D3AuthController'
const renderName: string = 'd3'
export default class D3AdminsController {
  public async index({ view, auth }) {
    await auth.authenticate()

    return view.render(renderName + '/index')
  }

  //TODO: buat label untuk menampilkan sasaran = {get_sasaran} sebelumnya
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

  //TODO : Tambahkan link ajax untuk cek populasi pada edge.
  //jadikan urutan flow pada javacript di edge:
  //if button submit clicked lempar parameter tahun ke link ajax
  //if(cek_pupulasi===true){ langsung kasih action post ke routes set_jadwal}
  //else{tampilkan modal dialog : update tabel populasi, if ok = direct ke ajax insert_populasi }
  public async cek_populasi({ request, session, response }) {
    try {
      let { tahun } = request.all()
      console.log(request.all())
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
      let alumniD3 = Env.get('WS_ALUMNI_D3')
      if (alumniD3) {
        alumniD3 = alumniD3.replace('yyyy', tahun)
        //ambil data alumni
        const data = await axios.get(alumniD3)
        const populasiD3 = data.data[0]
        //disini kita akan modifikasi setiap objek yang ada di array dataMappingProdi menggunakan fungsi map
        populasiD3.map((obj) => {
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
        const status = await Services.insert_populasi(populasiD3)
        // cek kalo statusnya tidak 0
        if (status) {
          //tambahkan total_inserted dengan jumlah data yang didapat
          total_inserted += populasiD3.length
        }
        //else{
        //jika gagal hapus data yg sudah di insert tadi
        // await Services.delete_populasi(tahun);
        // }

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

  public async set_sasaran({ request, response, session }) {
    try {
      let { tahun, periode } = request.all()
      var tahun_periode = tahun.toString().concat(periode.toString())
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
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'set_sasaran', error.toString(), request.ip())
      message(session, 'notification_sasaran', 'danger', 'Gagal mengubah sasaran Tracer Study')
      return { isSuccess: false }
    }
  }

  //TODO: buat label untuk menampilkan waktu = {get_jadwal} mulai dan berakhir sebelumnya
  public async jadwal({ view, auth }) {
    await auth.authenticate()

    const get_jadwal = await Services.get_jadwal()
    return view.render(renderName + '/jadwal', { get_jadwal })
  }

  //TODO: buat form untuk menampung data waktu mulai dan berakhir
  public async set_jadwal({ request, session, response }) {
    try {
      const { waktu_mulai, waktu_berakhir } = request.all()
      const update_jadwal = await Services.set_jadwal(waktu_mulai, waktu_berakhir)
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

  public async sms({ view, auth }) {
    await auth.authenticate()

    return view.render(renderName + '/sms')
  }
}
