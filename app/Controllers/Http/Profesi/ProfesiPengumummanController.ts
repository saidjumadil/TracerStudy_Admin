/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Services from 'App/Models/D3/D3Services' //FIXME : sesuaikan
import ErrorLog from 'App/Models/ErrorLog'

const className: string = 'ProfesiPengumummanController'

function message(session, nama_notif, type, message) {
  session.flash({
    [nama_notif]: {
      type: type,
      message: message,
    },
  })
}
const renderName: string = 'profesi'

export default class ProfesiPengumummanController {
  public async get_pengumuman({ view, auth }) {
    await auth.authenticate()
    const get_pengumuman = await Services.get_pengumuman()
    // if (get_pengumumman) {
    // return {get_pengumumman}
    // }
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
