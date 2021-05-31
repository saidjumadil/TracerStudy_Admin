/* eslint-disable prettier/prettier */
const renderName: string = 'pasca/s2'

export default class PascaS2AdminResponsController {
  // TODO: data pengisi
  public async pengisi({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/data/pengisi')
  }

  // TODO: data hasil
  public async hasil({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/data/hasil')
  }
  // TODO: import user monitoring
  public async importuser({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/data/import_user')
  }
}
