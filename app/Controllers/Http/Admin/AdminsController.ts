export default class AdminsController {
  public index({ view }) {
    return view.render('admin/index')
  }
  public sasaran({ view }) {
    return view.render('admin/sasaran')
  }
  public jadwal({ view }) {
    return view.render('admin/jadwal')
  }
  public sms({ view }) {
    return view.render('admin/sms')
  }
}
