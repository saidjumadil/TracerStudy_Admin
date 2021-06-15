/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Services from 'App/Models/D3/D3Services'
import ErrorLog from 'App/Models/ErrorLog'
// import express from 'express'
// import nodeExcel from 'excel-export'

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
  /* menampilkan halaman daftar pengisi kuesioner dari table users_monitoring */
  public async pengisi({ view, auth }) {
    await auth.authenticate()

    const GetFakultas = await Services.get_fakultas()
    const RouteActionProdi = `admin.${renderName}.get_prodi`
    const RouteActionDataPengisi = `admin.${renderName}.get_data_pengisi`
    return view.render(renderName + '/data/pengisi', {
      GetFakultas,
      RouteActionProdi,
      RouteActionDataPengisi,
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
      let current_timestamp = Date.now()
      let allData: Array<any> = []
      // handle jika monitoring tidak ada dicentang satupun oleh user
      monitoring_1 = monitoring_1 || []
      monitoring_2 = monitoring_2 || []
      monitoring_3 = monitoring_3 || []
      for (let index = 0; index < nim.length; index++) {
        allData.push({
          nim: nim[index],
          hp_valid_1: Number(hp_valid_1[index]),
          hp_valid_2: Number(hp_valid_2[index]),
          // pengecekan apakah monitoring ada dicentang
          monitoring_1: monitoring_1.includes(nim[index]) ? current_timestamp : '',
          monitoring_2: monitoring_2.includes(nim[index]) ? current_timestamp : '',
          monitoring_3: monitoring_3.includes(nim[index]) ? current_timestamp : '',
        })
      }
      //update data monitoring
      const update_data_pengisi = await Services.update_data_pengisi(allData)
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
      //export to excel

      const get_jawaban_pendahuluan = await Services.get_jawaban_users(
        periode_wisuda,
        kd_fjjp7_non,
        kd_fjjp7_reg,
        'jawaban_pendahuluan'
      )
      // const get_jawaban_kuliah =

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
