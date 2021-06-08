/* eslint-disable prettier/prettier */
const renderName: string = 'profesi'

export default class ProfesiAdminResponsController {
  public async pengisi({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/data/pengisi')
  }

  public async hasil({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/data/hasil')
  }

  public async importuser({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/data/import_user')
  }
}
