/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Services from 'App/Models/Pasca/S2/PascaS2Services' //sesuaikan
import ErrorLog from 'App/Models/ErrorLog'
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'

const className: string = 'PascaS2PengumummanController' //sesuaikan
const renderName: string = 'pasca/s2' //sesuaikan
const picture_name : string = 'banner_s2.jpg' //sesuikan

function message(session, nama_notif, type, message) {
  session.flash({
    [nama_notif]: {
      type: type,
      message: message,
    },
  })
}

export default class PascaS2PengumummanController {
  public async get_pengumuman({ view, auth }) {
    await auth.authenticate()
    const get_pengumuman = await Services.get_pengumuman()
    const uploadAction: string = '/admin/' + renderName + '/pengumuman/upload-image'
    return view.render(renderName + '/pengumuman', { get_pengumuman, uploadAction })
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
        Env.get('APP_URL') + '/uploads/'+picture_name,
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
