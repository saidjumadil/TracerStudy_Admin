/* eslint-disable prettier/prettier */
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Jadwal extends BaseModel {
  public static table = 'jadwal'
  public static connection = 'cdc_tracerstudy_d3'
  public static primaryKey = 'id'

  @column({ isPrimary: true })
  public id: number

  @column()
  public waktu_mulai: Date

  @column()
  public waktu_berakhir: Date
}
