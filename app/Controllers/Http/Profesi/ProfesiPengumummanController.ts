/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Services from 'App/Models/Profesi/ProfesiServices' // sesuaikan
import ErrorLog from 'App/Models/ErrorLog'

const className: string = 'ProfesiPengumummanController' //sesuaikan
const renderName: string = 'profesi' //sesuaikan

function message(session, nama_notif, type, message) {
  session.flash({
    [nama_notif]: {
      type: type,
      message: message,
    },
  })
}


export default class ProfesiPengumummanController {
  public async get_pengumuman({ view, auth }) {
    await auth.authenticate()
    const get_pengumuman = await Services.get_pengumuman()
    return view.render(renderName + '/pengumuman', { get_pengumuman })
  }

  public async update_pengumuman({ request, session, response }) {
    try {
      const {
        path_banner,
        pengumuman,
        laporan_online,
        tujuan,
        target_responden,
        jadwal,
        hubungi_kami,
      } = request.all()
      const store = await Services.update_pengumuman(
        path_banner,
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
