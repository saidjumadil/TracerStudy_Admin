/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Database from '@ioc:Adonis/Lucid/Database'

export default class D3User extends BaseModel {
  public static table = 'users'
  public static connection = 'cdc_tracerstudy_admin'
  public static primaryKey = 'nim'

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public nama_lengkap: string

  @column()
  public tahun_lulus: number

  @column()
  public status_completion: number

  @column({ isPrimary: true })
  public nim: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(d3User: D3User) {
    if (d3User.$dirty.password) {
      d3User.password = await Hash.make(d3User.password)
    }
  }

  public static async create_account(
    nama,
    npm,
    periode,
    email_daftar,
    password_clear,
    hash_password
  ) {
    return await Database.table('users').insert({
      nama_lengkap: nama,
      nim: npm,
      tahun_lulus: periode,
      password_clear: password_clear,
      password: hash_password,
      role: 5,
      email: email_daftar,
    })
  }

  public static async reset_password(nim_lupapassword, hashPassword, passwordClear) {
    return await Database.from('users').where('nim', nim_lupapassword).update({
      password: hashPassword,
      password_clear: passwordClear,
    })
  }
}
