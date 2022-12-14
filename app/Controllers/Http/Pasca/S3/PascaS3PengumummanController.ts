/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Services from 'App/Models/Pasca/S3/PascaS3Services' //sesuaikan
import ErrorLog from 'App/Models/ErrorLog'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import { message } from 'App/Global'

const className: string = 'PascaS3PengumummanController' //sesuaikan
const renderName: string = 'pasca/s3' // sesuaikan
const picture_name: string = 'banner_s3.jpg' //sesuikan
const subfolder: string = `/${Env.get('PREFIX')}`

export default class PascaS3PengumummanController {
  public async get_pengumuman({ view, auth }) {
    await auth.authenticate()
    const tahunSasaran = await Services.get_sasaran()
    const get_pengumuman = await Services.get_pengumuman()
    const uploadAction: string = subfolder + '/admin/' + renderName + '/pengumuman/upload-image'
    return view.render(renderName + '/pengumuman', { get_pengumuman, uploadAction, tahunSasaran })
  }

  public async upload_image({ request }) {
    const banner = request.file('banner', {
      size: '2mb',
      extnames: ['jpg'],
    })

    if (banner) {
      await banner.move(Application.publicPath('uploads'), {
        name: picture_name,
        overwrite: true,
      })
    }
  }

  public async update_pengumuman({ request, session, response }) {
    try {
      const { pengumuman, laporan_online, tujuan, target_responden, jadwal, hubungi_kami } =
        request.all()

      const store = await Services.update_pengumuman(
        Env.get('APP_URL') + '/uploads/' + picture_name,
        pengumuman,
        laporan_online,
        tujuan,
        target_responden,
        jadwal,
        hubungi_kami
      )
      if (store) {
        message(session, 'notification', 'success', 'Berhasil memperbarui pengumuman')
      }
      return response.redirect('back')
    } catch (error) {
      console.log(error)
      await ErrorLog.error_log(className, 'store_pengumuman', error.toString(), request.ip())
      message(session, 'notification', 'danger', 'Gagal mengubah pengumuman')
      return response.redirect('back')
    }
  }
}
