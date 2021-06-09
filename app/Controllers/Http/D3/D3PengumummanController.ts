/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Services from 'App/Models/D3/D3Services' //sesuaikan
import ErrorLog from 'App/Models/ErrorLog'
import { Application } from '@adonisjs/core/build/standalone'

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
  public async get_pengumuman({ view, auth }) {
    await auth.authenticate()
    const get_pengumuman = await Services.get_pengumuman()
    return view.render(renderName + '/pengumuman', { get_pengumuman })
  }

  public async update_pengumuman({ request, session, response }) {
    try {
      //TODO: ubah path_banner menjadi banner
      const {
        banner,
        status_gambar,
        pengumuman,
        laporan_online,
        tujuan,
        target_responden,
        jadwal,
        hubungi_kami,
      } = request.all()

      // let folder = Application.publicPath('style.css')
      //TODO: buat public path
      let folder = ''
      const imageUpload = request.file(banner, {
        types: ['image'],
        size: '2mb',
      });

      if(status_gambar===true){
        await imageUpload.move(folder, {
        name: 'banner.png',
        overwrite: true
        });
        if (!imageUpload.moved()) {
          message(session, 'notification', 'danger', 'Gagal mengunggah gambar')
          return imageUpload.error()
        }
      }

      const store = await Services.update_pengumuman(
        'banner.png',
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
