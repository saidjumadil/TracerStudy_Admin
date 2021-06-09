/* eslint-disable prettier/prettier */
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Pengumuman extends BaseModel {
  public static table = 'pengumuman' 
  public static connection = 'cdc_tracerstudy_profesi' //FIXME: sesuaikan
  public static primaryKey = 'id'

  @column({ isPrimary: true })
  public id: number

  @column()
  public path_banner: string

  @column()
  public pengumuman: string

  @column()
  public laporan_online: string

  @column()
  public tujuan: string

  @column()
  public target_responden: string
  
  @column()
  public jadwal: string

  @column()
  public hubungi_kami: string
}
