/* eslint-disable prettier/prettier */
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Jadwal extends BaseModel {
  public static table = 'jadwal'
  public static connection = 'cdc_tracerstudy_d3'
  public static primaryKey = 'id'

  @column({ isPrimary: true })
  public id: number

  @column()
  public waktu_mulai: DateTime

  @column()
  public waktu_berakhir: DateTime
}
