/* eslint-disable prettier/prettier */
import Database from '@ioc:Adonis/Lucid/Database'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Jadwal from './ProfesiJadwal' //FIXME: sesuaikan
import Sasaran from './ProfesiSasaran' //FIXME: sesuaikan

const conn: string = 'cdc_tracerstudy_profesi' //FIXME : sesuaikan

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
    const SearchId = { id: 1 }
    const Update = {
      tahun: tahun_periode,
    }
    return await Sasaran.updateOrCreate(SearchId, Update)
  }

  public static async get_jadwal() {
    return await Database.connection(conn).from('jadwal').first()
  }

  public static async set_jadwal(waktu_mulai: string, waktu_berakhir: string) {
    const SearchId = { id: 1 }

    const Updates = {
      waktu_mulai: waktu_mulai,
      waktu_berakhir: waktu_berakhir,
    }
    return await Jadwal.updateOrCreate(SearchId, Updates)
  }
}
