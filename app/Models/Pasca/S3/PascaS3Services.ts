/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Database from '@ioc:Adonis/Lucid/Database'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Pengumuman from './PascaS3Pengumuman'
import Sasaran from './PascaS3Sasaran'

const conn: string = 'cdc_tracerstudy_pasca_s3' //sesuiakan
const connAdmin: string = 'cdc_tracerstudy_admin' // sesuaikan
const conn_exsurvey: string = 'cdc_exsurvey' // sesuaikan
const jenjang: string = '3' //kode jenjang

export default class Services extends BaseModel {
  /* mengambil data untuk halaman beranda */
  public static async get_data_index(tahun: string, periode: string, list_kd_fjjp7) {
    let periode_wisuda = tahun.concat(periode)
    if (periode === '0') {
      return await Database.connection(conn).rawQuery(
        'SELECT' +
          ' lulusan.nama_fakultas, ' +
          ' lulusan.nama_prodi, ' +
          ' COUNT(*) AS jumlah_pendaftar, ' +
          ' COUNT(lulusan.tanggal_isi) AS selesai ' +
          ' FROM ' +
          ' (SELECT ' +
          ' mapping_prodi.tanggal_isi, ' +
          ' f.nama_fakultas AS nama_fakultas, ' +
          ' mapping_prodi.fak, ' +
          ' mapping_prodi.prodi AS nama_prodi, ' +
          ' mapping_prodi.kd_fjjp7, ' +
          ' mapping_prodi.kdbaru ' +
          ' FROM ' +
          ' (SELECT ' +
          ' p.nama_prodi AS prodi, ' +
          ' a.tanggal_isi, ' +
          ' p.kd_fjjp7, ' +
          ' p.kd_fakultas2 AS fak, ' +
          ' IFNULL (map.kd_fjjp7_reg, p.kd_fjjp7) AS kdbaru ' +
          ' FROM ' +
          ' users a ' +
          ' LEFT JOIN users_mapping_kd_fjjp7 map ON SUBSTR(a.nim, 3, 7) = map.kd_fjjp7_non ' +
          ' LEFT JOIN users_kd_fjjp7 p ON p.kd_fjjp7 = IFNULL (map.kd_fjjp7_reg, SUBSTR(a.nim, 3, 7)) ' +
          ' WHERE ' +
          " SUBSTR(a.tahun_lulus, 1, 4) = '" +
          tahun +
          "' " +
          ' ORDER BY p.kd_fjjp7) AS mapping_prodi ' +
          ' LEFT JOIN users_fakultas f ON mapping_prodi.fak = f.kd_fakultas2' +
          ' WHERE ' +
          ' mapping_prodi.kd_fjjp7 IN (' +
          list_kd_fjjp7 +
          ')) AS lulusan ' +
          ' GROUP BY lulusan.nama_prodi ' +
          ' ORDER BY lulusan.fak'
      )
    } else {
      return await Database.connection(conn).rawQuery(
        'SELECT' +
          ' lulusan.nama_fakultas, ' +
          ' lulusan.nama_prodi, ' +
          ' COUNT(*) AS jumlah_pendaftar, ' +
          ' COUNT(lulusan.tanggal_isi) AS selesai ' +
          ' FROM ' +
          ' (SELECT ' +
          ' mapping_prodi.tanggal_isi, ' +
          ' f.nama_fakultas AS nama_fakultas, ' +
          ' mapping_prodi.fak, ' +
          ' mapping_prodi.prodi AS nama_prodi, ' +
          ' mapping_prodi.kd_fjjp7, ' +
          ' mapping_prodi.kdbaru ' +
          ' FROM ' +
          ' (SELECT ' +
          ' p.nama_prodi AS prodi, ' +
          ' a.tanggal_isi, ' +
          ' p.kd_fjjp7, ' +
          ' p.kd_fakultas2 AS fak, ' +
          ' IFNULL (map.kd_fjjp7_reg, p.kd_fjjp7) AS kdbaru ' +
          ' FROM ' +
          ' users a ' +
          ' LEFT JOIN users_mapping_kd_fjjp7 map ON SUBSTR(a.nim, 3, 7) = map.kd_fjjp7_non ' +
          ' LEFT JOIN users_kd_fjjp7 p ON p.kd_fjjp7 = IFNULL (map.kd_fjjp7_reg, SUBSTR(a.nim, 3, 7)) ' +
          ' WHERE ' +
          " SUBSTR(a.tahun_lulus, 1, 5) = '" +
          periode_wisuda +
          "' " +
          ' ORDER BY p.kd_fjjp7) AS mapping_prodi ' +
          ' LEFT JOIN users_fakultas f ON mapping_prodi.fak = f.kd_fakultas2' +
          ' WHERE ' +
          ' mapping_prodi.kd_fjjp7 IN (' +
          list_kd_fjjp7 +
          ')) AS lulusan ' +
          ' GROUP BY lulusan.nama_prodi ' +
          ' ORDER BY lulusan.fak'
      )
    }
  }

  /* mengambil daftar kd_fjjp7 yg ada pada jenjang tersebut*/
  public static async get_list_kdfjjp7() {
    return await Database.connection(conn).from('users_kd_fjjp7').select('kd_fjjp7')
  }

  /* mengambil daftar fakultas */
  public static async get_fakultas() {
    return await Database.connection(conn)
      .query()
      .from('users_fakultas')
      .join('users_kd_fjjp7', 'users_fakultas.kd_fakultas2', '=', 'users_kd_fjjp7.kd_fakultas2')
      .groupBy('users_fakultas.kd_fakultas2')
  }

  /* mengambil daftar prodi */
  public static async get_prodi(id_fakultas: string) {
    return await Database.connection(conn)
      .query()
      .from('users_kd_fjjp7')
      .where('kd_fakultas2', id_fakultas)
  }

  /*mengambil data  users_mapping_kd_fjjp7*/
  public static async get_users_mapping_kd_fjjp7(kd_fjjp7) {
    let arrTracerKdfjjp7: any[] = []

    const mapping: any[] = await Database.connection(conn)
      .from('users_mapping_kd_fjjp7')
      .where('kd_fjjp7_reg', kd_fjjp7)

    for (let i = 0; i < mapping.length; i++) {
      arrTracerKdfjjp7.push(mapping[i].kd_fjjp7_non)
    }
    return arrTracerKdfjjp7
  }
  //versi lama
  // public static async get_users_mapping_kd_fjjp7(kd_fjjp7) {
  //   return await Database.connection(conn)
  //     .from('users_mapping_kd_fjjp7')
  //     .where('kd_fjjp7_non', kd_fjjp7)
  //     .orWhere('kd_fjjp7_reg', kd_fjjp7)
  //     .first()
  //   //TODO: ubah jadi fecth
  // }

  /* get data pengisi dari tabel monitoring */
  //versi baru (select berdasarkan kd_fjjp7_non)
  public static async get_data_pengisi(periode_wisuda: string, kd_fjjp7_non) {
    let arrUserMonitoring: any[] = []
    if (periode_wisuda.substring(4, 5) === '0') {
      periode_wisuda = periode_wisuda.substring(0, 4)
      for (let i = 0; i < kd_fjjp7_non.length; i++) {
        const data: any[] = await Database.connection(conn)
          .from('users_monitoring')
          .whereRaw("periode_wisuda like '" + periode_wisuda + "%'")
          .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7_non[i] + "'")
        if (data.length !== null) {
          arrUserMonitoring.push(...data)
        }
      }
      return arrUserMonitoring
    } else {
      for (let i = 0; i < kd_fjjp7_non.length; i++) {
        const data: any[] = await Database.connection(conn)
          .from('users_monitoring')
          .where('periode_wisuda', periode_wisuda)
          .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7_non[i] + "'")
        if (data.length !== null) {
          arrUserMonitoring.push(...data)
        }
      }
      return arrUserMonitoring
    }
  }
  //versi sebelumnya
  // FIXME: data mengabaikan periode wisuda
  // public static async get_data_pengisi(periode_wisuda: string, kd_fjjp7_non: string, kd_fjjp7_reg) {
  //   if (periode_wisuda.substring(4, 5) === '0') {
  //     periode_wisuda = periode_wisuda.substring(0, 4)
  //     return await Database.connection(conn)
  //       .from('users_monitoring')
  //       .where((query) => {
  //         query
  //           .whereRaw("periode_wisuda like '" + periode_wisuda + "%'")
  //           .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7_non + "'")
  //       })
  //       .orWhere((query) => {
  //         query
  //           .whereRaw("periode_wisuda like '" + periode_wisuda + "%'")
  //           .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7_reg + "'")
  //       })
  //   } else {
  //     return await Database.connection(conn)
  //       .from('users_monitoring')
  //       .where((query) => {
  //         query
  //           .where('periode_wisuda', periode_wisuda)
  //           .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7_non + "'")
  //       })
  //       .orWhere((query) => {
  //         query
  //           .where('periode_wisuda', periode_wisuda)
  //           .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7_reg + "'")
  //       })
  //   }
  // }

  /* edit data pengisi dari table monitoring */
  public static async update_data_pengisi(
    nim: string,
    hp_valid_1: number,
    hp_valid_2: number,
    monitoring_1: any,
    monitoring_2: any,
    monitoring_3: any
  ) {
    return await Database.connection(conn)
      .from('users_monitoring')
      .update({
        hp_valid_1,
        hp_valid_2,
        monitoring_1,
        monitoring_2,
        monitoring_3,
      })
      .where('nim', nim)
  }
  //versi sebelumnya
  // public static async update_data_pengisi(arrData: any) {
  //   const keyForSearch = 'nim'
  //   const payload = arrData
  //   return await UsersMonitoring.updateOrCreateMany(keyForSearch, payload)
  // }

  /* mengambil informasi status import monitoring, jika data sudah pernah import ada maka tidak dizinkan lagi import */
  public static async get_status_monitoring(tahun: string) {
    return await Database.connection(conn)
      .query()
      .from('users_monitoring')
      .whereRaw("periode_wisuda like '" + tahun + "%'")
      .first()
  }

  /* get data jawaban kuesioner untuk export ke excel */
  public static async get_jawaban_users(
    periode_wisuda: string,
    kd_fjjp7_non: any,
    nama_tabel: string
  ) {
    let arrDatas: any[] = []
    if (periode_wisuda.substring(4, 5) === '0') {
      let tahun_lulus = periode_wisuda.substring(0, 4)
      for (let i = 0; i < kd_fjjp7_non.length; i++) {
        const data: any[] = await Database.connection(conn)
          .from('users')
          .join(nama_tabel, 'users.nim', '=', nama_tabel.concat('.nim'))
          .select(nama_tabel + '.*')
          .whereRaw("users.tahun_lulus like '" + tahun_lulus + "%'")
          .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7_non[i] + "'")
          .where('users.status_completion', 1)
        if (data.length !== null) {
          const get_values = await this.id_to_value(data,nama_tabel)
          arrDatas.push(... get_values)
          // arrDatas.push(...data)
        }
      }
      return arrDatas
    } else {
      for (let i = 0; i < kd_fjjp7_non.length; i++) {
        const data: any[] = await Database.connection(conn)
          .from('users')
          .join(nama_tabel, 'users.nim', '=', nama_tabel.concat('.nim'))
          .select(nama_tabel + '.*')
          .where('users.tahun_lulus', periode_wisuda)
          .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7_non[i] + "'")
          .where('users.status_completion', 1)
        if (data.length !== null) {
          const get_values = await this.id_to_value(data,nama_tabel)
          arrDatas.push(... get_values)
          // arrDatas.push(...data)
        }
      }
      return arrDatas
    }
  }

  private static async id_to_value(data:any, nama_tabel:any) {
    //get list field
    let idToValueColoumn: any[] = [];
    const tempTable1 = 'pertanyaan_'+nama_tabel.split('_')[1]
    const query = await Database.connection(conn)
                        .from(tempTable1)
                        .select('nama_field','list_pilihan','trigger')
                        .whereNotNull('list_pilihan').orWhereNotNull('trigger')

    if (query!) {
      query.forEach(element => {
        if (element.nama_field.length && element.list_pilihan.length !== 0) {
          const arrData : any [] = [element.nama_field, element.list_pilihan]
          idToValueColoumn.push(arrData)
        }
        if (element.trigger !== null && element.trigger.length!==0) {
          const triggerData : any [] = [element.trigger.split(',')[1], element.trigger.split(',')[0]]
          idToValueColoumn.push(triggerData)
        }
      });
    }

    //TODO: query jawaban lainnya
    let obj: any[] = [];
    let finalResult : any[] =[]
    //loop banyyak data dari tiap table
    for (let j = 0; j < data.length; j++) {
      let output: any
      obj = JSON.parse(JSON.stringify(data))
      // loop untuk id->value untuk tiap row
      for (let k = 0; k < idToValueColoumn.length; k++) {
        if (Object.keys(obj[j]).includes(idToValueColoumn[k][0])) {
          //loop ambil masing2 value
          for (const [key, val] of Object.entries(obj[j])) {
            if (val && key == idToValueColoumn[k][0]) {
              let tempResult:any
              //check multi value
              if (String(val).includes(',')) {
                obj[j][key] = ''
                let multi_values = String(val).split(',')
                for (let l = 0; l < multi_values.length; l++) {
                  if (Number(multi_values[l]) == 10000) {
                    tempResult = await this.get_lainnya(nama_tabel, obj[j], key)
                  }
                  else {
                    const query = await Database.connection(conn).from(idToValueColoumn[k][1]).select('nama').where('id', String(multi_values[l]))
                    tempResult = JSON.parse(JSON.stringify(query, null, 4))[0]['nama']
                  }
                  // ganti value
                  obj[j][key] = obj[j][key].concat(tempResult, (l==multi_values.length-1)?'':', ')
                }
              } 
              //check single value
              if (!String(val).includes(',')) {
                if (val == 10000) {
                  tempResult = await this.get_lainnya(nama_tabel, obj[j], key)
                }
                else if(Number(val)) {
                  const query = await Database.connection(conn).from(idToValueColoumn[k][1]).select('nama').where('id', String(val))
                  tempResult = JSON.parse(JSON.stringify(query, null, 4))[0]['nama']
                }
                // ganti value
                obj[j][key] = tempResult
              }
            }
          }
        }
        output = Object(obj[j]);
      }
      finalResult.push(output)
    }
    return finalResult
  }

  private static async get_lainnya(nama_tabel:string, obj:object, key:string) {
    const tempTable1 = 'pertanyaan_'+nama_tabel.split('_')[1]
    try {
      const query2 = await Database.connection(conn).from('jawaban_lainnya').select('jawaban')
                    .where('nim', obj['nim'])
                    .where('id_pertanyaan', Database.from(tempTable1).select('id').where('nama_field', key))
                    .where('tabel', nama_tabel)

      // console.log('tes queri ',  query2)
      if (query2.length !== 0) {
        if (key == 'id_aktivitas') {
          return 'Belum memungkinkan bekerja ('+query2[0].jawaban+')'
        }
        return 'Lainnya ('+query2[0].jawaban+')'
      }
      if (query2.length === 0  && key == 'id_aktivitas') {
        return 'Belum memungkinkan bekerja'
      }
      
      return 'Lainnya'
    } catch (error) {
      console.log('err ', error)
    }
  }
  //versi lama
  // public static async get_jawaban_users(
  //   periode_wisuda: string,
  //   kd_fjjp7_non: string,
  //   kd_fjjp7_reg: string,
  //   nama_tabel: string
  // ) {
  //   if (periode_wisuda.substring(4, 5) === '0') {
  //     let tahun_lulus = periode_wisuda.substring(0, 4)
  //     return await Database.connection(conn)
  //       .from('users')
  //       .join(nama_tabel, 'users.nim', '=', nama_tabel.concat('.nim'))
  //       .select(nama_tabel + '.*')
  //       .where((query) => {
  //         query
  //           .whereRaw("users.tahun_lulus like '" + tahun_lulus + "%'")
  //           .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7_non + "'")
  //         //.whereNotNull('users.tanggal_isi')
  //       })
  //       .orWhere((query) => {
  //         query
  //           .whereRaw("users.tahun_lulus like '" + tahun_lulus + "%'")
  //           .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7_reg + "'")
  //         //.whereNotNull('users.tanggal_isi')
  //       })
  //   } else {
  //     return await Database.connection(conn)
  //       .from('users')
  //       .join(nama_tabel, 'users.nim', '=', nama_tabel.concat('.nim'))
  //       .select(nama_tabel + '.*')
  //       .where((query) => {
  //         query
  //           .where('users.tahun_lulus', periode_wisuda)
  //           .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7_non + "'")
  //         //.whereNotNull('users.tanggal_isi')
  //       })
  //       .orWhere((query) => {
  //         query
  //           .where('users.tahun_lulus', periode_wisuda)
  //           .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7_reg + "'")
  //         //.whereNotNull('users.tanggal_isi')
  //       })
  //   }
  // }

  /* untuk memasukan data dari alumni pada database exit survei ke table users_monitoring */
  public static async import_monitoring(tahun: string) {
    const get_import_status = await Services.get_status_monitoring(tahun)

    //Data Populasi
    let dataPopulasi = await Database.connection(conn)
    .query()
    .from('populasi')
    .select(
      'nim',
      'nama_mhs as nama', 
      'periode as periode_wisuda'
    )
    .whereRaw("periode like '" + tahun + "%'")
    .whereRaw("SUBSTR(nim,5,1)= '" + jenjang + "'") //sesuaikan dengan fjjp7

    //Data Monitoring
    let dataMonitoring = await Database.connection(conn)
    .query()
    .from('users_monitoring')
    .select(
      'nim',
    )
    .whereRaw("periode_wisuda like '" + tahun + "%'")
    .whereRaw("SUBSTR(nim,5,1)= '" + jenjang + "'")
    
    //menampung data nim yang sudah dibuat
    let nimData : any[] = []
    for(let data of dataMonitoring){
      nimData.push(data.nim)
    }
    
    //Data Exit Survey
    let datas = await Database.connection(conn_exsurvey)
      .query()
      .from('alumni')
      .select(
        'nim',
        'hape1 as no_hape_1',
        'hape2 as no_hape_2'
      )
      .whereRaw("periode_wisuda like '" + tahun + "%'")
      .whereRaw("SUBSTR(nim,5,1)= '" + jenjang + "'") //sesuaikan dengan fjjp7
    
    //Import Data pupolasi ke user_monitoring
    if (!get_import_status){
      await Database.connection(conn).table('users_monitoring').multiInsert(dataPopulasi)
      console.log("Berhasil import dari tabel populasi")
    }
    else{
      for(let data of dataPopulasi){
        if(!nimData.includes(data.nim)){
          await Database.connection(conn).table('users_monitoring').insert(data)
          console.log("Data yang ditambahkan : " + data.nim + " " + data.nama)
        }
      }
    }

    
    let count = 0

    for (let data of datas){
        await Database.connection(conn)
          .query()
          .from('users_monitoring')
          .where('nim', data.nim)
          .update(data)
        count++
        console.log(data.nim)
    }  
    console.log("Jumlah yang di import : " + count + " orang")
    //hasil datas ke users_monitoring
    return true
  }

  /* update status monitoring pada table sasaran */
  public static async update_status_monitoring() {
    return await Database.connection(conn)
      .query()
      .from('sasaran')
      .update({
        status_import_monitoring: 1,
      })
      .where('status_aktif', 1)
  }

  /* get data responden*/
  public static async get_responden(nim: string) {
    return await Database.connection(conn).from('users').where('nim', nim).first()
  }

  /*insert responden*/
  public static async create_responden(nim, nama_lengkap, tahun_lulus, password_clear, password) {
    await Database.connection(conn)
      .query()
      .from('users_monitoring')
      .update({
        username: nim,
      })
      .where('nim', nim)
    return await Database.connection(conn).table('users').insert({
      nim,
      nama_lengkap,
      tahun_lulus,
      password_clear,
      password,
      role: 5,
    })
  }

  //cek email masih tersedia atau tidak
  public static async get_availabe_email(email: string) {
    return await Database.connection(conn).from('users').where('email', email).first()
  }

  /* edit email responden*/
  public static async edit_responden(nim: string, email: string) {
    return await Database.connection(conn).from('users').where('nim', nim).update({
      email: email,
    })
  }

  public static async off_sasaran() {
    //set semua status_aktif jadi 0
    return await Database.connection(conn).from('sasaran').update({ status_aktif: 0 })
  }

  /* mengambil data dari table sasaran yang sedang aktif */
  public static async get_list_sasaran() {
    return await Database.connection(conn).from('sasaran').where('status_aktif', 1)
  }

  /* mengambil data dari table sasaran yang sedang aktif */
  public static async get_sasaran() {
    return await Database.connection(conn).from('sasaran').where('status_aktif', 1)
  }

  public static async get_kajur_prodi(nim : string) {
    return await Database.connection(connAdmin).from('users_kajur').where('aktif', 1).where('nim', nim).first()
  }

  public static async get_kajur(kd_fjjp7 : string) {
    return await Database.connection(conn).from('users_kd_fjjp7').select('*').where('kd_fjjp7', kd_fjjp7).first()
  }

  /* mengambil informasi apakah sasaran sudah pernah di buat pada tracer study sebelumnya */
  public static async cek_sasaran(new_sasaran: string) {
    //return true = sasaran sudah pernah dibuat maka tidak diizinkan ubah sasaran
    let sasaran: string = new_sasaran.substring(0, 4)
    if (new_sasaran.substring(4, 5) === '0') {
      return await Database.connection(conn)
        .from('sasaran')
        .whereRaw("tahun like '" + sasaran + "%'")
        .where('status_aktif', 1)
        .first()
    } else {
      //cek sudah pernah di tracer secara semua periode
      let cek_semua_periode: string = sasaran.concat('0')
      let cek = await Database.connection(conn)
        .from('sasaran')
        .where('tahun', cek_semua_periode)
        .first()
      //jika sudah pernah diset sasaran semua periode maka opsi set perperiode tidak boleh lagi
      if (cek) {
        return true
      }
      //jika belum pernah diset sasaran semua periode maka opsi set perperiode dizinkan
      return await Database.connection(conn)
        .from('sasaran')
        .where('tahun', new_sasaran)
        .where('status_aktif', 1)
        .first()
    }
  }

  /* ambil informasi nim valid, jika nim valid return data */
  public static async get_validasi_nim(nim: string) {
    return await Database.connection(conn).from('populasi').where('nim', nim).first()
  }

  /* ambil informasi apakah populasi sudah pernah diinsert ke database */
  public static async get_populasi(tahun) {
    return await Database.connection(conn)
      .from('populasi')
      .whereRaw("periode like '" + tahun + "%' ")
      .first()
  }

  /* insert data populasi dari webservice ke database */
  public static async insert_populasi(data_populasi) {
    const trx = await Database.connection(conn).transaction()
    try {
      await trx.insertQuery().table('populasi').insert(data_populasi)

      await trx.commit()

      return true
    } catch (error) {
      console.log(error)
      await trx.rollback()
      return false
    }
  }

  /* mengubah sasaran tracer study */
  public static async set_sasaran(tahun_periode: string, status_import: number) {
    //set semua status_aktif jadi 0
    // await Database.connection(conn).from('sasaran').update({ status_aktif: 0 })

    return await Database.connection(conn).table('sasaran').insert({
      tahun: tahun_periode,
      status_aktif: 1,
      status_import_monitoring: status_import,
    })
  }

  /* mengambil jadwal tracer study yg sedang aktif */
  public static async get_jadwal() {
    return await Database.connection(conn).from('sasaran').where('status_aktif', 1).first()
  }

  /* mengubah jadwal tracer study yg sedang aktif */
  public static async set_jadwal(waktu_mulai: Date, waktu_berakhir: Date) {
    const Updates = {
      waktu_mulai: waktu_mulai,
      waktu_berakhir: waktu_berakhir,
    }
    return await Sasaran.query().where('status_aktif', 1).update(Updates)
  }

  /* mengambil data pengumuman */
  public static async get_pengumuman() {
    return await Database.connection(conn).from('pengumuman').first()
  }

  /* memperbarui data pengumuman */
  public static async update_pengumuman(
    path_banner: string,
    pengumuman: string,
    laporan_online: string,
    tujuan: string,
    target_responden: string,
    jadwal: string,
    hubungi_kami: string
  ) {
    const SearchId = { id: 1 }
    const Updates = {
      path_banner: path_banner,
      pengumuman: pengumuman,
      laporan_online: laporan_online,
      tujuan: tujuan,
      target_responden: target_responden,
      jadwal: jadwal,
      hubungi_kami: hubungi_kami,
    }
    return await Pengumuman.updateOrCreate(SearchId, Updates)
  }
}
