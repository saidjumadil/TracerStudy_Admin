/* eslint-disable prettier/prettier */
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class UsersMonitoring extends BaseModel {
  public static table = 'users_monitoring' 
  public static connection = 'cdc_tracerstudy_d3' //sesuaikan
  public static primaryKey = 'id'

  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public nama: string

  @column()
  public nim: string

  @column()
  public periode_wisuda: string

  @column()
  public no_hape_1: string
  
  @column()
  public hp_valid_1: number
  @column()
  public no_hape_2: string
  
  @column()
  public hp_valid_2: number

  @column()
  public monitoring_1: string

  @column()
  public monitoring_2: string

  @column()
  public monitoring_3: string

  @column()
  public tanggal_isi: Date
}
