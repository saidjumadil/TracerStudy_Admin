export default class PascaS2AdminsController {
  public index({ view }) {
    return view.render('pasca/s2/index')
  }
  public sasaran({ view }) {
    return view.render('pasca/s2/sasaran')
  }
  public jadwal({ view }) {
    return view.render('pasca/s2/jadwal')
  }
  public sms({ view }) {
    return view.render('pasca/s2/sms')
  }
}
