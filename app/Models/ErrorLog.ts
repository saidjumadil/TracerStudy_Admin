/* eslint-disable prettier/prettier */
import Database from '@ioc:Adonis/Lucid/Database'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class ErrorLog extends BaseModel {

  public static async error_log(
    nama_class: string,
    nama_function: string,
    describe: string,
    ip_address: string
  ) {
    return await Database.table('error_log').insert({
      class: nama_class,
      function: nama_function,
      describe: describe,
      ip_address: ip_address,
    })
  }

}

