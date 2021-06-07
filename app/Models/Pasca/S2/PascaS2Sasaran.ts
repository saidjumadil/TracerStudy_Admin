/* eslint-disable prettier/prettier */
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Sasaran extends BaseModel {
  public static table = 'sasaran'
  public static connection = 'cdc_tracerstudy_pasca_s2'
  public static primaryKey = 'id'

  @column({ isPrimary: true })
  public id: number

  @column()
  public tahun: string

  @column()
  public status_aktif: number
  
  @column()
  public waktu_mulai: Date

  @column()
  public waktu_berakhir: Date
}
