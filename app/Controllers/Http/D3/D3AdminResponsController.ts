/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Application from '@ioc:Adonis/Core/Application'
import Services from 'App/Models/D3/D3Services'
import ErrorLog from 'App/Models/ErrorLog'
import ExportToExcelController from '../ExportToExcelController'
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
  //TODO: tampilkan daftar sasaran untuk admin. khusus enuum hanya daftar periode pada tahun tersebut
  /* menampilkan halaman daftar pengisi kuesioner dari table users_monitoring */
  public async pengisi({ view, auth }) {
    await auth.authenticate()

    //testing
    // let tahun = '2018'
    // let periode = '0'
    // let kd_fjjp7 = '0800202'
    // let periode_wisuda = tahun.concat(periode)
    // let { kd_fjjp7_non, kd_fjjp7_reg } = await Services.get_users_mapping_kd_fjjp7(kd_fjjp7)
    // console.log({ kd_fjjp7_non, kd_fjjp7_reg })

    // //export to excel
    // const get_jawaban_pendahuluan = await Services.get_jawaban_users(
    //   periode_wisuda,
    //   kd_fjjp7_non,
    //   kd_fjjp7_reg,
    //   'jawaban_pendahuluan'
    // )

    // // console.log(get_jawaban_pendahuluan)
    // const workSheetColumnName: any = ['ID', 'Name', 'Age']
    // const workSheetName = 'Jawaban Pendahuluan'
    // const filePath = './public/uploads'
    // ExportToExcelController.exportUsersToExcel(
    //   get_jawaban_pendahuluan,
    //   workSheetColumnName,
    //   workSheetName,
    //   filePath
    // )
    //end testing

    //get daftar sasaran
    const daftar_sasaran = await Services.get_list_sasaran()
    const GetFakultas = await Services.get_fakultas()
    const RouteActionProdi = `admin.${renderName}.get_prodi`
    const RouteActionDataPengisi = `admin.${renderName}.get_data_pengisi`

    return view.render(renderName + '/data/pengisi', {
      GetFakultas,
      RouteActionProdi,
      RouteActionDataPengisi,
      daftar_sasaran,
    })
  }

  /* ajax mengambil daftar pengisi kuesioner berdasarkan prodi */
  public async ajax_data_pengisi({ request }) {
    try {
      let { tahun, periode, kd_fjjp7 } = request.all()
      let periode_wisuda: string = 'null'
      if (tahun && periode) periode_wisuda = tahun.concat(periode)
      let { kd_fjjp7_non, kd_fjjp7_reg } = await Services.get_users_mapping_kd_fjjp7(kd_fjjp7) //get kd_fjjp7 non dan reg
      //jika admin maka bisa lihat periode sasaran tracer sebelumnya
      if (periode_wisuda !== 'null') {
        console.log(periode_wisuda)
        const get_data_pengisi = await Services.get_data_pengisi(
          periode_wisuda,
          kd_fjjp7_non,
          kd_fjjp7_reg
        )
        // console.log(get_data_pengisi)
        return { get_data_pengisi }
      } else {
        //jika enum maka ambil data periode yg skrg saja
        const get_periode_wisuda = await Services.get_sasaran() // get periode skrg
        const get_data_pengisi = await Services.get_data_pengisi(
          get_periode_wisuda.tahun,
          kd_fjjp7_non,
          kd_fjjp7_reg
        )
        return { get_data_pengisi }
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'get_data_pengisi', error.toString(), request.ip())
      return { get_data_pengisi: [] }
    }
  }

  /* memperbarui data pengisi kuesioner pada table users_monitoring */
  public async update_data_pengisi({ request, session, response }) {
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
        message(session, 'notification', 'success', 'Berhasil memperbarui data')
        return response.redirect('back')
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'update_data_pengisi', error.toString(), request.ip())
      message(session, 'notification', 'danger', 'Gagal memperbarui data')
      return response.redirect('back')
    }
  }

  /* menambilkan halaman untuk export users_monitoring */
  public async hasil({ view, auth }) {
    await auth.authenticate()
    const GetFakultas = await Services.get_fakultas()
    const RouteActionProdi = `admin.${renderName}.get_prodi`
    return view.render(renderName + '/data/hasil', { GetFakultas, RouteActionProdi })
  }

  /* menambilkan halaman untuk export users_monitoring */
  public async export_hasil_users({ request, response, session }) {
    try {
      let { tahun, periode, kd_fjjp7 } = request.all()
      let periode_wisuda = tahun.concat(periode)
      let { kd_fjjp7_non, kd_fjjp7_reg } = await Services.get_users_mapping_kd_fjjp7(kd_fjjp7)
      console.log({ kd_fjjp7_non, kd_fjjp7_reg })

      //export to excel
      const get_jawaban_pendahuluan = await Services.get_jawaban_users(
        periode_wisuda,
        kd_fjjp7_non,
        kd_fjjp7_reg,
        'jawaban_pendahuluan'
      )

      console.log(get_jawaban_pendahuluan)
      const workSheetColumnName: any = ['ID', 'Name', 'Age']
      const workSheetName = 'Jawaban Pendahuluan'
      const filePath = Application.publicPath('uploads')
      ExportToExcelController.exportExcel(
        get_jawaban_pendahuluan,
        workSheetColumnName,
        workSheetName,
        filePath
      )
      // var result = nodeExcel.execute(conf)
      // response.setHeader('Content-Type', 'application/vnd.openxmlformats')
      // response.setHeader('Content-Disposition', 'attachment; filename=' + 'Report.xlsx')
      // response.end(result, 'binary')

      // 		//$result = Data::getPendahuluan($tahun,$fakultas,$jurusan);
      // 		// $pendahuluan = json_decode(Data::getPendahuluan($tahun,$kode_jurusan), true);
      // 		// //$result = Data::getKuliah($tahun,$fakultas,$jurusan);
      // 		// $kuliah = json_decode(Data::getKuliah($tahun,$kode_jurusan), true);
      // 		// //$result = Data::getStudy($tahun,$fakultas,$jurusan);
      // 		// $study = json_decode(Data::getStudy($tahun,$kode_jurusan), true);
      // 		// //$result = Data::getBekerja($tahun,$fakultas,$jurusan);
      // 		// $bekerja = json_decode(Data::getBekerja($tahun,$kode_jurusan), true);
      // 		// //$result = Data::getWirausaha($tahun,$fakultas,$jurusan);
      // 		// $wirausaha = json_decode(Data::getWirausaha($tahun,$kode_jurusan), true);

      // 		// Excel::create('hasil_ts_'.$tahun.'_'.$nama_jurusan, function($excel) use($pendahuluan, $kuliah, $bekerja, $study, $wirausaha) {
      // 		// 	$excel->sheet('Pertanyaan Pendahuluan', function($sheet) use($pendahuluan) {
      // 		// 		$sheet->fromArray($pendahuluan);
      // 		// 	});
      // 		// 	$excel->sheet('Pengalaman Perkuliahan', function($sheet) use($kuliah) {
      // 		// 		$sheet->fromArray($kuliah);
      // 		// 	});
      // 		// 	$excel->sheet('Bekerja', function($sheet) use($bekerja) {
      // 		// 		$sheet->fromArray($bekerja);
      // 		// 	});
      // 		// 	$excel->sheet('Lanjut Studi', function($sheet) use($study) {
      // 		// 		$sheet->fromArray($study);
      // 		// 	});
      // 		// 	$excel->sheet('Wirausaha', function($sheet) use($wirausaha) {
      // 		// 		$sheet->fromArray($wirausaha);
      // 		// 	});
      // 		// })->export('xls');
      message(session, 'notification', 'success', 'Berhasil export data hasil kuesioner TS')
      return response.redirect('back')
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'export_hasil', error.toString(), request.ip())
      message(session, 'notification', 'danger', 'Gagal export data hasil kuesioner TS')
      return response.redirect('back')
    }
  }

  public async importuser({ view, auth }) {
    await auth.authenticate()
    const sasaran = await Services.get_sasaran()

    return view.render(renderName + '/data/import_user', { sasaran })
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
