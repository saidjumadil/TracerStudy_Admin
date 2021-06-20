import { message, TahunSasaran } from 'App/Global'
import Services from 'App/Models/Pasca/S3/PascaS3Services'

const routeName: string = 'pasca.s3.'
export default class PascaS3Step4 {
  public async handle({ response, session }, next: () => Promise<void>) {
    const tahunSasaran: TahunSasaran = await Services.get_sasaran() // get periode skrg

    // console.log(auth)
    if (!tahunSasaran) {
      message(
        session,
        'notification',
        'danger',
        'Tidak dapat masuk ke Halaman Ubah Jadwal dikarenakan belum mengubah sasaran dan mengimport user monitoring'
      )
      return response.redirect().toRoute('admin.' + routeName + 'index')
    }
    if (tahunSasaran.status_import_monitoring === 0) {
      message(
        session,
        'notification',
        'danger',
        'Tidak dapat masuk ke Halaman Ubah Jadwal dikarenakan belum import user monitoring'
      )
      return response.redirect().toRoute('admin.' + routeName + 'index')
    }
    return await next()
  }
}
