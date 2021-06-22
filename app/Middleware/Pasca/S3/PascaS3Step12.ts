import { message, TahunSasaran } from 'App/Global'
import Services from 'App/Models/Pasca/S3/PascaS3Services'

const routeName: string = 'pasca.s3.'
export default class PascaS3Step12 {
  public async handle({ response, session }, next: () => Promise<void>) {
    const tahunSasaran: TahunSasaran = await Services.get_sasaran() // get periode skrg

    // console.log(auth)
    if (!tahunSasaran) return await next()
    if (!tahunSasaran.waktu_mulai) {
      message(
        session,
        'notification',
        'danger',
        'Tidak dapat mengubah Tahun Sasaran yang telah di set sebelumnya sampai Tracer selesai'
      )
      return response.redirect().toRoute('admin.' + routeName + 'index')
    }
    if (tahunSasaran.tahun) {
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
