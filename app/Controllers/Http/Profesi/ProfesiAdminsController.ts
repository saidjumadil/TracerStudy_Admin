export default class ProfesiAdminsController {
  public index({ view }) {
    return view.render('profesi/index')
  }
  public sasaran({ view }) {
    return view.render('profesi/sasaran')
  }
  public jadwal({ view }) {
    return view.render('profesi/jadwal')
  }
  public sms({ view }) {
    return view.render('profesi/sms')
  }
}
