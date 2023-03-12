import { message, TahunSasaran } from 'App/Global'
import Services from 'App/Models/D3/D3Services'

const routeName: string = 'd3.'
export default class D3Step4 {
  public async handle({ response, session }, next: () => Promise<void>) {
    const tahunSasaran: TahunSasaran[] = await Services.get_sasaran() // get periode skrg

    // console.log(auth)
    if (!tahunSasaran[0]) {
      message(
        session,
        'notification',
        'danger',
        'Tidak dapat masuk ke Halaman Ubah Jadwal dikarenakan belum mengubah sasaran dan mengimport user monitoring'
      )
      return response.redirect().toRoute('admin.' + routeName + 'index')
    }
    if (tahunSasaran[0].status_import_monitoring === 0) {
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
