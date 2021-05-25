export default class PascaS3AdminsController {
  public index({ view }) {
    return view.render('pasca/s3/index')
  }
  public sasaran({ view }) {
    return view.render('pasca/s3/sasaran')
  }
  public jadwal({ view }) {
    return view.render('pasca/s3/jadwal')
  }
  public sms({ view }) {
    return view.render('pasca/s3/sms')
  }
}
