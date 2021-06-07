/* eslint-disable @typescript-eslint/naming-convention *//* eslint-disable prettier/prettier */
import Database from '@ioc:Adonis/Lucid/Database'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Sasaran from './D3Sasaran' //FIXME: sesuaikan

const conn: string = 'cdc_tracerstudy_d3' //FIXME : sesuaikan
const conn_exsurvey: string = 'cdc_exsurvey' //FIXME : sesuaikan

export default class Services extends BaseModel {
  public static async get_fakultas() {
    return await Database.connection(conn).query().from('users_fakultas')
  }

  public static async get_prodi(id_fakultas) {
    return await Database.connection(conn)
      .query()
      .from('users_kd_fjjp7')
      .where('kd_fakultas2', id_fakultas)
  }

  //inserr data monitoring
  public static async insert_monitoring(tahun : string){
  if(tahun.substring(4,5)==="0"){
    let thn = tahun.substring(0,4)
    return await Database.connection(conn_exsurvey)
    .query()
    .select("nim, nama_lengkap as nama, periode_wisuda, hape1 as no_hape_1, hape2 as no_hape_2")
    .whereRaw("periode_wisuda like '" + thn + "%'")
    .whereRaw("substr(nim,4,5)= '1'")
  }else{
    return await Database.connection(conn_exsurvey)
    .query()
    .select("nim, nama_lengkap as nama, periode_wisuda, hape1 as no_hape_1, hape2 as no_hape_2")
    .where("periode_wisuda",tahun)
    .whereRaw("substr(nim,4,5)= '1'")
  }

      //"select nim as nim, nama_lengkap as nama, periode_wisuda as periode_wisuda, hape1 as no_hape_1, hape2 as no_hape_2
    //FROM alumni WHERE SUBSTR(periode_wisuda,1,4) = '$thn_import'"
}



  public static async get_sasaran() {
    return await Database.connection(conn).from('sasaran').first()
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

  public static async set_sasaran(tahun_periode: string) {

    //set semua status_aktif jadi 0\
    await Database.connection(conn).from("sasaran").update({status_aktif: 0})
    // await Sasaran.fill({ status_aktif: 0 }).save()

    return await Database.connection(conn)
    .table("sasaran")
    .insert({
      tahun: tahun_periode,
      status_aktif: 1
    })
    
  }

  public static async get_jadwal() {
    return await Database.connection(conn).from('sasaran').where("status_aktif",1).first()
  }

  public static async set_jadwal(waktu_mulai: Date, waktu_berakhir: Date) {
    const SearchId = { status_aktif: 1 }

    const Updates = {
      waktu_mulai: waktu_mulai,
      waktu_berakhir: waktu_berakhir,
    }
    return await Sasaran.updateOrCreate(SearchId, Updates)
  }
}
