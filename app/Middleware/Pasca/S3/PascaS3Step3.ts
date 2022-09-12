import { message, TahunSasaran } from 'App/Global'
import Services from 'App/Models/Pasca/S3/PascaS3Services'

const routeName: string = 'pasca.s3.'
export default class PascaS3Step3 {
  public async handle({ response, session }, next: () => Promise<void>) {
    const tahunSasaran: TahunSasaran = await Services.get_sasaran() // get periode skrg

    // console.log(auth)
    if (!tahunSasaran[0]) {
      message(
        session,
        'notification',
        'danger',
        'Tidak dapat masuk ke Halaman Import User Monitoring dikarenakan belum mengubah Tahun Sasaran'
      )
      return response.redirect().toRoute('admin.' + routeName + 'index')
    }
    if (tahunSasaran[0].status_import_monitoring === 1) {
      message(
        session,
        'notification',
        'danger',
        'Import User Monitoring sudah dilakukan. anda tidak dapat mengaksesnya lagi'
      )
      return response.redirect().toRoute('admin.' + routeName + 'index')
    }
    return await next()
  }
}
