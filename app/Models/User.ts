/* eslint-disable prettier/prettier */
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Database from '@ioc:Adonis/Lucid/Database'

export default class D3User extends BaseModel {
  public static table = 'users'
  public static conn = 'cdc_tracerstudy_admin'
  public static primaryKey = 'username'

  @column({ isPrimary: true })
  public username: string

  @column()
  public nama: string

  @column()
  public legacy_role: number

  @column()
  public email: string

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

  public static async get_users(current_user) {
    if (current_user.username === 'root') {
      return await Database.connection(this.conn)
        .query()
        .from('users')
        .select('*')
        .whereNot('username', 'root')
    } else {
      return await Database.connection(this.conn)
        .query()
        .from('users')
        .select('*')
        .whereNot('username', 'root')
        .whereNot('permission_d3', 2)
        .whereNot('permission_pasca_s2', 2)
        .whereNot('permission_pasca_s3', 2)
        .whereNot('permission_profesi', 2)
    }
  }

  //cek email masih tersedia atau tidak
  public static async get_availabe_email(email: string) {
    return await Database.connection(this.conn).from('users').where('email', email)
  }

  //get akun ini untuk validasi sesuia dengan username untuk reset password akun
  public static async get_available_users(username: string, email_lupapassword: string) {
    return await Database.connection(this.conn)
      .from('users')
      .where('username', username)
      .where('email', email_lupapassword)
  }

  //menambahkan akun baru
  public static async insert_users(
    username: string,
    nama: string,
    email: string,
    password: string,
    legacy_role: number,
    permission_d3: number,
    permission_pasca_s2: number,
    permission_pasca_s3: number,
    permission_profesi: number
  ) {
    return await Database.connection(this.conn).table('users').insert({
      username,
      nama,
      email,
      password,
      legacy_role,
      permission_d3,
      permission_pasca_s2,
      permission_pasca_s3,
      permission_profesi,
    })
  }

  //menghapus user
  public static async hapus_user(username: string) {
    return await this.query().where('username', username).delete()
  }

  //memperbaru data akun, seperti nama dan permission
  public static async update_users(
    username: string,
    nama: string,
    legacy_role: number,
    permission_d3: number,
    permission_pasca_s2: number,
    permission_pasca_s3: number,
    permission_profesi: number
  ) {
    return await Database.connection(this.conn).from('users').where('username', username).update({
      nama: nama,
      legacy_role: legacy_role,
      permission_d3: permission_d3,
      permission_pasca_s2: permission_pasca_s2,
      permission_pasca_s3: permission_pasca_s3,
      permission_profesi: permission_profesi,
    })
  }

  //cek perubahan password perhari
  public static async cek_perubahan_password(username) {
    return await Database.connection(this.conn).from('users').where('username', username).first()
  }

  //update jumlah ubah password
  public static async jumlah_ubah_password(
    username: string,
    waktu_ubah: Date,
    jumlah_ubah_password: number
  ) {
    return await Database.connection(this.conn).from('users').where('username', username).update({
      password_terakhir_reset: waktu_ubah,
      password_jumlah_terakhir_reset: jumlah_ubah_password,
    })
  }

  //reset jumlah ubah jadi 0
  public static async reset_jumlah(username) {
    return await Database.connection(this.conn)
      .from('users')
      .update({ password_jumlah_terakhir_reset: 0 })
      .where('username', username)
  }

  public static async ubah_password(username: string, hashPassword: string) {
    return await Database.from('users').where('username', username).update({
      password: hashPassword,
    })
  }
}
