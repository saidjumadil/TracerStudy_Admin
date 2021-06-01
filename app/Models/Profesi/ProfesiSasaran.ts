/* eslint-disable prettier/prettier */
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Sasaran extends BaseModel {
  public static table = 'sasaran'
  public static connection = 'cdc_tracerstudy_profesi'
  public static primaryKey = 'id'

  @column({ isPrimary: true })
  public id: number

  @column()
  public tahun: string
}
