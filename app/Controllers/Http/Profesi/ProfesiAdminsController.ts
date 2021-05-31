const renderName: string = 'profesi'

export default class ProfesiAdminsController {
  public async index({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/index')
  }
  public async sasaran({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/sasaran')
  }
  public async jadwal({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/jadwal')
  }
  public async sms({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/sms')
  }
}
