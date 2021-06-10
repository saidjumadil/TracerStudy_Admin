/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Application from '@ioc:Adonis/Core/Application'
import Services from 'App/Models/D3/D3Services' //sesuaikan
import ErrorLog from 'App/Models/ErrorLog'
import Env from '@ioc:Adonis/Core/Env'

const className: string = 'D3PengumummanController' //sesuaikan
const renderName: string = 'd3' //sesuiakan

function message(session, nama_notif, type, message) {
  session.flash({
    [nama_notif]: {
      type: type,
      message: message,
    },
  })
}

export default class D3PengumummanController {
  public async get_pengumuman({ view, auth, request }) {
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
        name: 'banner.jpg',
        overwrite: true,
      })
    }
  }

  public async update_pengumuman({ request, session, response }) {
    try {
      const { pengumuman, laporan_online, tujuan, target_responden, jadwal, hubungi_kami } =
        request.all()

      const store = await Services.update_pengumuman(
        Env.get('APP_URL') + '/uploads/banner.jpg',
        pengumuman,
        laporan_online,
        tujuan,
        target_responden,
        jadwal,
        hubungi_kami
      )
      if (store) {
        message(session, 'notification', 'success', 'berhasil memperbarui pengumuman')
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
