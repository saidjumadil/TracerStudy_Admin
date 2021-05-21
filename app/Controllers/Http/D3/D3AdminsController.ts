export default class D3AdminsController {
  public index({ view }) {
    return view.render('d3/index')
  }
  public sasaran({ view }) {
    return view.render('d3/sasaran')
  }
  public jadwal({ view }) {
    return view.render('d3/jadwal')
  }
  public sms({ view }) {
    return view.render('d3/sms')
  }
}
