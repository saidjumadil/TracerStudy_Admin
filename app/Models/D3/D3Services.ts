/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Database from '@ioc:Adonis/Lucid/Database'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Sasaran from './D3Sasaran' // sesuaikan
import Pengumuman from './D3Pengumuman'

const conn: string = 'cdc_tracerstudy_d3' // sesuaikan
const conn_exsurvey: string = 'cdc_exsurvey' // sesuaikan

export default class Services extends BaseModel {
  public static async get_fakultas() {
    return await Database.connection(conn).query().from('users_fakultas')
  }

  //get data pengis pada tabel monitoring
  public static async get_data_pengisi(tahun: string, periode: string, kd_fjjp7:string){
    let periode_wisuda = tahun.concat(periode)
    //1508107010037
   return await Database.connection(conn)
   .query()
   .from('users_monitoring')
   .where('periode_wisuda', periode)
   .whereRaw("SUBSTR(nim,2,7)= '"+kd_fjjp7+"'") //sesuaikan dengan fjjp7

  }

  public static async get_prodi(id_fakultas) {
    return await Database.connection(conn)
      .query()
      .from('users_kd_fjjp7')
      .where('kd_fakultas2', id_fakultas)
  }

  public static async get_import_status(tahun: string){
      return await Database.connection(conn)
      .query()
      .from('users_monitoring')
      .whereRaw("periode_wisuda like '" + tahun + "%'")
      .first()
  }

  //vesri lama
  //ambil informasi status import monitoring 
  // public static async get_import_status(tahun: string, periode: string){
  //   let periode_wisuda = tahun.concat(periode)
  //   if(periode==="0"){
  //     return await Database.connection(conn)
  //     .query()
  //     .from('users_monitoring')
  //     .whereRaw("periode_wisuda like '" + tahun + "%'")
  //     .first()
  //   }else{
  //     return await Database.connection(conn)
  //     .query()
  //     .from('users_monitoring')
  //     .where("periode_wisuda", periode_wisuda )
  //     .first()
  //   }
  // }

  public static async insert_monitoring(tahun: string) {
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
      .whereRaw("SUBSTR(nim,5,1)= '0'") //sesuaikan dengan fjjp7
    //hasil datas ke users_monitoring
    return await Database.connection(conn).table('users_monitoring').multiInsert(datas)
  }

  //versi lama
  //insert data monitoring
  // public static async insert_monitoring(tahun: string, periode: string) {
  //   let periode_wisuda = tahun.concat(periode)
  //   let datas
  //   if(periode==="0"){
  //     datas = await Database.connection(conn_exsurvey)
  //     .query()
  //     .from('alumni')
  //     .select(
  //       'nim',
  //       'nama_lengkap as nama',
  //       'periode_wisuda',
  //       'hape1 as no_hape_1',
  //       'hape2 as no_hape_2'
  //     )
  //     .whereRaw("periode_wisuda like '" + tahun + "%'")
  //     .whereRaw("SUBSTR(nim,5,1)= '0'") //sesuaikan dengan fjjp7
  //   }else{
  //     datas = await Database.connection(conn_exsurvey)
  //       .query()
  //       .from('alumni')
  //       .select(
  //         'nim',
  //         'nama_lengkap as nama',
  //         'periode_wisuda',
  //         'hape1 as no_hape_1',
  //         'hape2 as no_hape_2'
  //       )
  //       .where('periode_wisuda', periode_wisuda)
  //       .whereRaw("substr(nim,5,1)= '0'") //sesuaikan dengan fjjp7
  //   }
  //   //hasil datas ke users_monitoring
  //   return await Database.connection(conn).table('users_monitoring').multiInsert(datas)
  // }

  //update status monitoring pada table sasaran
  public static async update_status_monitoring(){
   return await Database.connection(conn).query().from('sasaran').update({
     status_import_monitoring: 1
   }).where('status_aktif',1)
  }

  public static async get_sasaran() {
    return await Database.connection(conn).from('sasaran').where('status_aktif', 1).first()
  }

  //TODO: JANGAN lupa copy ke semua model perjenjang
  public static async get_status_monitoring(tahun){
    return await Database.connection(conn)
    .from('users_monitoring').whereRaw("periode_wisuda like'" +tahun+ "%'")
    .first()
  }

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

      return await Database.connection(conn).from('sasaran').where('tahun', new_sasaran).first()
    }
  }

  public static async get_populasi(tahun) {
    return await Database.connection(conn)
      .from('populasi')
      .whereRaw("periode like '" + tahun + "%' ")
      .first()
  }

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

  public static async set_sasaran(tahun_periode: string, status_import: number) {
    //set semua status_aktif jadi 0\
    await Database.connection(conn).from('sasaran').update({ status_aktif: 0 })
    // await Sasaran.fill({ status_aktif: 0 }).save()

    return await Database.connection(conn).table('sasaran').insert({
      tahun: tahun_periode,
      status_aktif: 1,
      status_import_monitoring: status_import
    })
  }

  public static async get_jadwal() {
    return await Database.connection(conn).from('sasaran').where('status_aktif', 1).first()
  }

  public static async set_jadwal(waktu_mulai: Date, waktu_berakhir: Date) {
    const SearchId = { status_aktif: 1 }

    const Updates = {
      waktu_mulai: waktu_mulai,
      waktu_berakhir: waktu_berakhir,
    }
    return await Sasaran.updateOrCreate(SearchId, Updates)
  }

  public static async get_pengumuman() {
    return await Database.connection(conn).from('pengumuman').first()
  }

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
