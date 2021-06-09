/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Database from '@ioc:Adonis/Lucid/Database'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Pengumuman from './ProfesiPengumuman'
import Sasaran from './ProfesiSasaran'

const conn: string = 'cdc_tracerstudy_profesi'

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
    return await Database.connection(conn).from('sasaran').where('status_aktif', 1).first()
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

  public static async set_sasaran(tahun_periode: string) {
    //set semua status_aktif jadi 0\
    await Database.connection(conn).from('sasaran').update({ status_aktif: 0 })
    // await Sasaran.fill({ status_aktif: 0 }).save()

    return await Database.connection(conn).table('sasaran').insert({
      tahun: tahun_periode,
      status_aktif: 1,
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
  public static async get_pengumuman(){
    return await Database.connection(conn).from("pengumuman").first()
  }

  public static async update_pengumuman(
    path_banner: string, 
    pengumuman: string, 
    laporan_online: string , 
    tujuan: string, 
    target_responden: string, 
    jadwal: string, 
    hubungi_kami: string
    ){
      const SearchId = { id: 1 }
      const Updates = {
        path_banner: path_banner, 
        pengumuman: pengumuman, 
        laporan_online: laporan_online , 
        tujuan: tujuan, 
        target_responden: target_responden, 
        jadwal: jadwal, 
        hubungi_kami: hubungi_kami
      }
      return await Pengumuman.updateOrCreate(SearchId, Updates)
  }
}
