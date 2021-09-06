/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prettier/prettier */
import Services from 'App/Models/Pasca/S2/PascaS2Services'
import ErrorLog from 'App/Models/ErrorLog'
import { message, exportExcel, formatFileExcel } from 'App/Global'

const renderName: string = 'pasca/s2' //sesuaikan
const routeName: string = 'pasca.s2' //sesuaikan
const excelName: string = 'pasca_s2' //sesuaikan
const className: string = 'PascaS2AdminResponsController' //sesuaikan
const table_name = [
  'jawaban_pendahuluan',
  'jawaban_kuliah',
  'jawaban_bekerja',
  'jawaban_study',
  'jawaban_wirausaha',
] //sesuaikan
const workSheetName = [
  'Pertanyaan Pendahuluan',
  'Pengalaman Perkuliahan',
  'Bekerja',
  'Lanjut Studi',
  'Wirausaha',
] //sesuaikan

export default class PascaS2AdminResponsController {
  /* menampilkan halaman daftar pengisi kuesioner dari table users_monitoring */
  public async pengisi({ view, auth }) {
    await auth.authenticate()
    //get daftar sasaran
    const tahunSasaran = await Services.get_sasaran()
    let daftar_sasaran = await Services.get_list_sasaran()
    if (auth.user.legacy_role === 4) {
      daftar_sasaran = daftar_sasaran.filter(row => row.tahun.substring(0, 4) === tahunSasaran.tahun.substring(0, 4))
    }
    const GetFakultas = await Services.get_fakultas()
    const RouteActionProdi = `admin.${routeName}.get_prodi`
    const RouteActionDataPengisi = `admin.${routeName}.get_data_pengisi`
    const RouteActionUpdateDataPengisi = `admin.${routeName}.data.update_data_pengisi`
    return view.render(renderName + '/data/pengisi', {
      GetFakultas,
      RouteActionProdi,
      RouteActionDataPengisi,
      RouteActionUpdateDataPengisi,
      daftar_sasaran,
      tahunSasaran,
    })
  }

  /* ajax mengambil daftar pengisi kuesioner berdasarkan prodi */
  public async ajax_data_pengisi({ request }) {
    try {
      let { tahun, periode, kd_fjjp7 } = request.all()
      let periode_wisuda: string = 'null'
      if (tahun && periode) periode_wisuda = tahun.concat(periode)
      let kd_fjjp7_mapping = await Services.get_users_mapping_kd_fjjp7(kd_fjjp7) //get kd_fjjp7 non dan reg
      //TODO: buat handler show kalo mapping nga ada
      if (kd_fjjp7_mapping.length === 0) {
        return "tidak tersedia di mapping"
      }
      //jika admin maka bisa lihat periode sasaran tracer sebelumnya
      if (periode_wisuda !== 'null') {
        console.log(periode_wisuda)
        const get_data_pengisi = await Services.get_data_pengisi(
          periode_wisuda,
          kd_fjjp7_mapping
        )
        return { get_data_pengisi }
      } else {
        //jika enum maka ambil data periode yg skrg saja
        const get_periode_wisuda = await Services.get_sasaran() // get periode skrg
        const get_data_pengisi = await Services.get_data_pengisi(
          get_periode_wisuda.tahun,
          kd_fjjp7_mapping
        )
        return { get_data_pengisi }
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'get_data_pengisi', error.toString(), request.ip())
      return { get_data_pengisi: [] }
    }
  }
  //versi sebelumnya
  // public async ajax_data_pengisi({ request }) {
  //   try {
  //     let { tahun, periode, kd_fjjp7 } = request.all()
  //     let periode_wisuda: string = 'null'
  //     if (tahun && periode) periode_wisuda = tahun.concat(periode)
  //     let { kd_fjjp7_non, kd_fjjp7_reg } = await Services.get_users_mapping_kd_fjjp7(kd_fjjp7) //get kd_fjjp7 non dan reg
  //     //jika admin maka bisa lihat periode sasaran tracer sebelumnya
  //     if (periode_wisuda !== 'null') {
  //       console.log(periode_wisuda)
  //       const get_data_pengisi = await Services.get_data_pengisi(
  //         periode_wisuda,
  //         kd_fjjp7_non,
  //         kd_fjjp7_reg
  //       )
  //       return { get_data_pengisi }
  //     } else {
  //       //jika enum maka ambil data periode yg skrg saja
  //       const get_periode_wisuda = await Services.get_sasaran() // get periode skrg
  //       const get_data_pengisi = await Services.get_data_pengisi(
  //         get_periode_wisuda.tahun,
  //         kd_fjjp7_non,
  //         kd_fjjp7_reg
  //       )
  //       return { get_data_pengisi }
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     await ErrorLog.error_log(className, 'get_data_pengisi', error.toString(), request.ip())
  //     return { get_data_pengisi: [] }
  //   }
  // }

  /* memperbarui data pengisi kuesioner pada table users_monitoring */
  public async update_data_pengisi({ request, session }) {
    try {
      let { nim, hp_valid_1, hp_valid_2, monitoring_1, monitoring_2, monitoring_3 } = request.all()
      //convert monitoring to timestamp now
      let current_timestamp = Date.now()
      //jika monitoring di centang maka di update dengan waktu sekarang
      monitoring_1 = monitoring_1 ? current_timestamp : '' //jika false maka string kosong
      monitoring_2 = monitoring_2 ? current_timestamp : '' //jika false maka string kosong
      monitoring_3 = monitoring_3 ? current_timestamp : '' //jika false maka string kosong

      //update data monitoring
      const update_data_pengisi = await Services.update_data_pengisi(
        nim,
        hp_valid_1,
        hp_valid_2,
        monitoring_1,
        monitoring_2,
        monitoring_3
      )

      if (update_data_pengisi) {
        return {
          isSuccess: true,
          notification: { type: 'success', message: 'Berhasil memperbarui data' },
        }
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'update_data_pengisi', error.toString(), request.ip())
      message(session, 'notification', 'danger', 'Gagal memperbarui data')
      return {
        isSuccess: false,
        notification: { type: 'danger', message: 'Gagal memperbarui data' },
      }
    }
  }

  /* menambilkan halaman untuk export users_monitoring */
  public async hasil({ view, auth }) {
    await auth.authenticate()
    const GetFakultas = await Services.get_fakultas()
    const RouteActionProdi = `admin.${routeName}.get_prodi`
    const tahunSasaran = await Services.get_sasaran()
    return view.render(renderName + '/data/hasil', { GetFakultas, RouteActionProdi, tahunSasaran })
  }

  /* menambilkan halaman untuk export users_monitoring */
  public async export_hasil_users({ request }) {
    try {
      let { tahun, periode, kd_fjjp7_prodi } = request.all()
      let periode_wisuda = tahun.concat(periode)
      const [kd_fjjp7, prodi] = kd_fjjp7_prodi.split(':')
      let kd_fjjp7_non = await Services.get_users_mapping_kd_fjjp7(kd_fjjp7)
      let datas: any[] = []

      for (let index = 0; index < table_name.length; index++) {
        const get_jawabans = await Services.get_jawaban_users(
          periode_wisuda,
          kd_fjjp7_non,
          table_name[index]
        )
        datas.push(get_jawabans)
      }

      if (!datas[0][0]) {
        return {
          isSuccess: false,
          message: { type: 'warning', message: 'data export tidak tersedia' },
        }
      }

      const filePath = formatFileExcel(tahun, periode, excelName, prodi)
      //export to excel
      const workBook = exportExcel(datas, workSheetName)
      return {
        isSuccess: true,
        workBook,
        filePath,
        message: { type: 'success', message: 'Berhasil export data' },
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'export_hasil', error.toString(), request.ip())
      return {
        isSuccess: false,
        message: { type: 'danger', message: 'Gagal export data hasil kuesioner TS' },
      }
    }
  }
  //versi sebelumnya
  // public async export_hasil_users({ request }) {
  //   try {
  //     let { tahun, periode, kd_fjjp7_prodi } = request.all()
  //     let periode_wisuda = tahun.concat(periode)
  //     const [kd_fjjp7, prodi] = kd_fjjp7_prodi.split(':')
  //     let { kd_fjjp7_non, kd_fjjp7_reg } = await Services.get_users_mapping_kd_fjjp7(kd_fjjp7)
  //     let datas: any[] = []

  //     for (let index = 0; index < table_name.length; index++) {
  //       const get_jawabans = await Services.get_jawaban_users(
  //         periode_wisuda,
  //         kd_fjjp7_non,
  //         kd_fjjp7_reg,
  //         table_name[index]
  //       )
  //       datas.push(get_jawabans)
  //     }

  //     if (!datas[0][0]) {
  //       return {
  //         isSuccess: false,
  //         message: { type: 'warning', message: 'data export tidak tersedia' },
  //       }
  //     }

  //     const filePath = formatFileExcel(tahun, periode, excelName, prodi)
  //     //export to excel
  //     const workBook = exportExcel(datas, workSheetName)
  //     return {
  //       isSuccess: true,
  //       workBook,
  //       filePath,
  //       message: { type: 'success', message: 'Berhasil export data' },
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     await ErrorLog.error_log(className, 'export_hasil', error.toString(), request.ip())
  //     return {
  //       isSuccess: false,
  //       message: { type: 'danger', message: 'Gagal export data hasil kuesioner TS' },
  //     }
  //   }
  // }

  public async importuser({ view, auth }) {
    await auth.authenticate()
    const sasaran = await Services.get_sasaran()
    const tahunSasaran = await Services.get_sasaran()
    return view.render(renderName + '/data/import_user', { sasaran, tahunSasaran })
  }

  /* store data import monitoring */
  public async store_monitoring({ request, response, session }) {
    try {
      //get tahun dari tabel sasaran sasaran
      const tahun = await Services.get_sasaran()
      let tahun_monitoring = tahun.tahun.substring(0, 4)
      const get_import_status = await Services.get_status_monitoring(tahun_monitoring)
      if (get_import_status) {
        message(session, 'notification', 'warning', 'Data monitoring sudah pernah diimport!')
        return response.redirect('back')
      }
      const store_monitoring = await Services.import_monitoring(tahun_monitoring)
      if (store_monitoring) {
        //update status user monitoring untuk sasaran
        await Services.update_status_monitoring()
        message(session, 'notification', 'success', 'Berhasil import data monitoring')
        return response.redirect().toRoute('admin.' + routeName + '.index')
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

  /* ajax mengambil daftar prodi berdasarkan fakultas */
  public async ajax_prodi({ request }) {
    try {
      const { id_fakultas } = request.all()
      const GetProdi = await Services.get_prodi(id_fakultas)
      return { GetProdi }
    } catch (error) {
      console.log(error)
    }
  }
}
