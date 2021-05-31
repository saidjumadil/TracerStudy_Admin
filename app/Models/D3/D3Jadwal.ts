/* eslint-disable prettier/prettier */
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Jadwal extends BaseModel {
  public static table = 'jadwal'
  public static connection = 'cdc_tracerstudy_d3'
  public static primaryKey = 'id'

  @column({ isPrimary: true })
  public id: number

  // FIXME: ubah tipe data dari ini
  @column()
  public waktu_mulai: string

  @column()
  public waktu_berakhir: string
}
