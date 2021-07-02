/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Database from '@ioc:Adonis/Lucid/Database'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Sasaran from './PascaS2Sasaran'
import Pengumuman from './PascaS2Pengumuman'

const conn: string = 'cdc_tracerstudy_pasca_s2' //sesuaikan
const conn_exsurvey: string = 'cdc_exsurvey' // sesuaikan
const jenjang: string = '2' //kode jenjang

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
    return await Database.connection(conn).query().from('users_fakultas')
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
    return await Database.connection(conn)
      .from('users_mapping_kd_fjjp7')
      .where('kd_fjjp7_non', kd_fjjp7)
      .orWhere('kd_fjjp7_reg', kd_fjjp7)
      .first()
  }

  /* get data pengisi dari tabel monitoring */
  // FIXME: data mengabaikan periode wisuda
  public static async get_data_pengisi(periode_wisuda: string, kd_fjjp7_non: string, kd_fjjp7_reg) {
    if (periode_wisuda.substring(4, 5) === '0') {
      periode_wisuda = periode_wisuda.substring(0, 4)
      return await Database.connection(conn)
        .from('users_monitoring')
        .where((query) => {
          query
            .whereRaw("periode_wisuda like '" + periode_wisuda + "%'")
            .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7_non + "'")
        })
        .orWhere((query) => {
          query
            .whereRaw("periode_wisuda like '" + periode_wisuda + "%'")
            .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7_reg + "'")
        })
    } else {
      return await Database.connection(conn)
        .from('users_monitoring')
        .where((query) => {
          query
            .where('periode_wisuda', periode_wisuda)
            .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7_non + "'")
        })
        .orWhere((query) => {
          query
            .where('periode_wisuda', periode_wisuda)
            .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7_reg + "'")
        })
    }
  }

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
  // public static async get_jawaban_users(tahun: string, kd_fjjp7: string, nama_tabel: string) {
  //   if (tahun.substring(4, 5) === '0') {
  //     let tahun_lulus = tahun.substring(0, 4)
  //     console.log(tahun_lulus)
  //     return await Database.connection(conn)
  //       .from('users')
  //       .join(nama_tabel, 'users.nim', '=', nama_tabel.concat('.nim'))
  //       .select('jawaban_pendahuluan.*')
  //       .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7 + "'")
  //       .whereRaw("users.tahun_lulus like '" + tahun_lulus + "%'")
  //     // .whereNotNull('users.tanggal_isi')
  //   } else {
  //     return await Database.connection(conn)
  //       .from('users')
  //       .join('jawaban_pendahuluan', 'users.nim', '=', 'jawaban_pendahuluan.nim')
  //       .select('jawaban_pendahuluan.*')
  //       .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7 + "'")
  //       .where('users.tahun_lulus', tahun)
  //     //.whereNotNull('users.tanggal_isi')
  //   }
  // }
  public static async get_jawaban_users(
    periode_wisuda: string,
    kd_fjjp7_non: string,
    kd_fjjp7_reg: string,
    nama_tabel: string
  ) {
    if (periode_wisuda.substring(4, 5) === '0') {
      let tahun_lulus = periode_wisuda.substring(0, 4)
      return await Database.connection(conn)
        .from('users')
        .join(nama_tabel, 'users.nim', '=', nama_tabel.concat('.nim'))
        .select(nama_tabel + '.*')
        .where((query) => {
          query
            .whereRaw("users.tahun_lulus like '" + tahun_lulus + "%'")
            .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7_non + "'")
          //.whereNotNull('users.tanggal_isi')
        })
        .orWhere((query) => {
          query
            .whereRaw("users.tahun_lulus like '" + tahun_lulus + "%'")
            .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7_reg + "'")
          //.whereNotNull('users.tanggal_isi')
        })
    } else {
      return await Database.connection(conn)
        .from('users')
        .join(nama_tabel, 'users.nim', '=', nama_tabel.concat('.nim'))
        .select(nama_tabel + '.*')
        .where((query) => {
          query
            .where('users.tahun_lulus', periode_wisuda)
            .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7_non + "'")
          //.whereNotNull('users.tanggal_isi')
        })
        .orWhere((query) => {
          query
            .where('users.tahun_lulus', periode_wisuda)
            .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7_reg + "'")
          //.whereNotNull('users.tanggal_isi')
        })
    }
  }

  /* untuk memasukan data dari alumni pada database exit survei ke table users_monitoring */
  public static async import_monitoring(tahun: string) {
    let datas = await Database.connection(conn_exsurvey)
      .query()
      .from('alumni')
      .select(
        'nim',
        'nama_lengkap as nama',
        'periode_wisuda',
        'hape1 as no_hape_1',
        'hape2 as no_hape_2'
      )
      .whereRaw("periode_wisuda like '" + tahun + "%'")
      .whereRaw("SUBSTR(nim,5,1)= '" + jenjang + "'") //sesuaikan dengan fjjp7
    //hasil datas ke users_monitoring
    return await Database.connection(conn).table('users_monitoring').multiInsert(datas)
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

  /* edit email responden*/
  public static async edit_responden(nim: string, email: string) {
    return await Database.connection(conn).from('users').where('nim', nim).update({
      email: email,
    })
  }

  /* mengambil data dari table sasaran yang sedang aktif */
  public static async get_list_sasaran() {
    return await Database.connection(conn).from('sasaran')
  }

  /* mengambil data dari table sasaran yang sedang aktif */
  public static async get_sasaran() {
    return await Database.connection(conn).from('sasaran').where('status_aktif', 1).first()
  }

  /* mengambil informasi apakah sasaran sudah pernah di buat pada tracer study sebelumnya */
  public static async cek_sasaran(new_sasaran: string) {
    //return true = sasaran sudah pernah dibuat maka tidak diizinkan ubah sasaran
    let sasaran: string = new_sasaran.substring(0, 4)
    if (new_sasaran.substring(4, 5) === '0') {
      return await Database.connection(conn)
        .from('sasaran')
        .whereRaw("tahun like '" + sasaran + "%'")
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
      return await Database.connection(conn).from('sasaran').where('tahun', new_sasaran).first()
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
    await Database.connection(conn).from('sasaran').update({ status_aktif: 0 })

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
    const SearchId = { status_aktif: 1 }

    const Updates = {
      waktu_mulai: waktu_mulai,
      waktu_berakhir: waktu_berakhir,
    }
    return await Sasaran.updateOrCreate(SearchId, Updates)
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
