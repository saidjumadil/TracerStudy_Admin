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
  /* menampilkan halaman daftar pengisi kuesioner dari table users_monitoring */
  public async pengisi({ view, auth }) {
    await auth.authenticate()
    const GetFakultas = await Services.get_fakultas()
    return view.render(renderName + '/data/pengisi', { GetFakultas })
  }

  //TODO: buat routes ajax untuk mengambil data pengisi lempar kd_fjjp7 saja
  /* ajax mengambil daftar pengisi kuesioner berdasarkan prodi */
  public async ajax_data_pengisi({request}){
    try {
      const { kd_fjjp7 } = request.all()
      const periode_wisuda = await Services.get_sasaran()
      const get_data_pengisi = await Services.get_data_pengisi( periode_wisuda.tahun, kd_fjjp7 )
      return {get_data_pengisi}
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'get_data_pengisi', error.toString(), request.ip())
    }
  }

  //TODO: hubungkan edge dengan action form edit data pengisi
  // pada checkbox monitoring set value = "0" jika kolom monitoring =""
  // pada checkbox monitoring set value = "1" jika kolom monitoring = ada waktu timestamp
  /* memperbarui data pengisi kuesioner pada table users_monitoring */
  public async update_data_pengisi({request, session, response}){
    try {
      let {nim, hape_valid_1, hape_valid_2, monitoring_1, monitoring_2, monitoring_3} = request.all()
      //convert monitoring to timestamp now
      let current_timestamp = Date.now()
      //jika monitoring di centang maka di update dengan waktu sekarang
      monitoring_1 === "1" ? monitoring_1 = current_timestamp :  monitoring_1 = '' //jika false maka string kosong
      monitoring_2 === "1" ? monitoring_2 = current_timestamp :  monitoring_2 = '' //jika false maka string kosong
      monitoring_3 === "1" ? monitoring_3 = current_timestamp :  monitoring_3 = '' //jika false maka string kosong
      const update_data_pengisi = await Services.update_data_pengisi(
        nim, 
        hape_valid_1, 
        hape_valid_2, 
        monitoring_1, 
        monitoring_2, 
        monitoring_3
        )
      if(update_data_pengisi){
        message(session, 'notification', 'success', 'Berhasil memperbarui data')
        return response.redirect('back')
      }
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'update_data_pengisi', error.toString(), request.ip())
    }
  }

  //TODO: tambahkan dropdown periode
  /* menambilkan halaman untuk export users_monitoring */
  public async hasil({ view, auth }) {
    await auth.authenticate()
    //TODO : untuk testing get jawaban sebelum di export
    const get_pendahuluan = await Services.get_jawaban_users("20181","0800202", "jawaban_pendahuluan" )
    console.log("sss "+JSON.stringify(get_pendahuluan));
    
    return view.render(renderName + '/data/hasil')
  }

  /* menambilkan halaman untuk export users_monitoring */
  public async export_hasil_users({request, response, session}){
    try {
      let { tahun, periode, kd_fjjp7} = request.all()
      let periode_wisuda = tahun.concat(periode)

      //export to excel
      const get_jawaban_pendahuluan = await Services.get_jawaban_users(periode_wisuda, kd_fjjp7, "jawaban_pendahuluan")
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

  //TODO: hapus dropdown tahun dan periode
  public async importuser({ view, auth }) {
    await auth.authenticate()

    return view.render(renderName + '/data/import_user')
  }

  /* store data import monitoring */
  public async store_monitoring({ request, response, session }) {
    try {
      //get tahun dari tabel sasaran sasaran
      const tahun = await Services.get_sasaran()
      let tahun_monitoring = tahun.tahun.substring(0,4)
      const get_import_status = await Services.get_status_monitoring(tahun_monitoring)
      if(get_import_status){
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

  /* ajax mengambil daftar prodi berdasarkan fakultas */
  //TODO: buat route ajax pada edge untuk ambil daftar prodi
  public async ajax_prodi({ request }) {
    try {
      const { id_fakultas } = request.all()
      const GetProdi = await Services.get_prodi(id_fakultas)
      return {GetProdi}
    } catch (error) {
      console.log(error)
    }
  }
}
