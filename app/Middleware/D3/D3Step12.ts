/* eslint-disable prettier/prettier */
import { message, TahunSasaran } from 'App/Global'
import Services from 'App/Models/D3/D3Services'

const routeName: string = 'd3.'
export default class D3Step12 {
  public async handle({ response, session }, next: () => Promise<void>) {
    const tahunSasaran : TahunSasaran [] = await Services.get_sasaran() // get periode skrg

    console.log(tahunSasaran)

    if (tahunSasaran.length == 0) return await next()
    if (!tahunSasaran[0].waktu_mulai) {
      message(
        session,
        'notification',
        'danger',
        'Tidak dapat mengubah Tahun Sasaran yang telah di set sebelumnya sampai Tracer selesai'
      )
      return response.redirect().toRoute('admin.' + routeName + 'index')
    }

    if (Number(tahunSasaran[0].waktu_berakhir) < Date.now()) return await next()
    if (tahunSasaran[0].tahun) {
      message(
        session,
        'notification',
        'danger',
        'Tidak dapat mengubah Tahun Sasaran yang telah di set sebelumnya sampai Tracer selesai'
      )
      return response.redirect().toRoute('admin.' + routeName + 'index')
    }
    return await next()
  }
}
