/* eslint-disable prettier/prettier */
const renderName: string = 'pasca/s2'

export default class PascaS2AdminResponsController {
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
