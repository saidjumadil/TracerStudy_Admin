/* eslint-disable prettier/prettier */
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Database from '@ioc:Adonis/Lucid/Database'

export default class D3User extends BaseModel {
  public static table = 'users'
  public static connection = 'cdc_tracerstudy_admin'
  public static primaryKey = 'username'

  @column({ isPrimary: true })
  public username: string

  @column()
  public nama: string

  @column()
  public permission_d3: number

  @column()
  public permission_pasca_s2: number

  @column()
  public permission_pasca_s3: number

  @column()
  public permission_profesi: number

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @beforeSave()
  public static async hashPassword(d3User: D3User) {
    if (d3User.$dirty.password) {
      d3User.password = await Hash.make(d3User.password)
    }
  }

  // public static async create_account(
  //
  //   nama,
  //   npm,
  //   periode,
  //   email_daftar,
  //   password_clear,
  //   hash_password
  // ) {
  //   return await Database.table('users').insert({
  //     nama_lengkap: nama,
  //     nim: npm,
  //     tahun_lulus: periode,
  //     password_clear: password_clear,
  //     password: hash_password,
  //     role: 5,
  //     email: email_daftar,
  //   })
  // }

  public static async reset_password(username: string, hashPassword: string) {
    return await Database.from('users').where('username', username).update({
      password: hashPassword
    })
  }
}
