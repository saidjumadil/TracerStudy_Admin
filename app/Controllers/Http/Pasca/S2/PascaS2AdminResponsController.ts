/* eslint-disable prettier/prettier */
export default class PascaS2AdminResponsController {
  // TODO: data pengisi
  public pengisi({ view }) {
    return view.render('pasca/s2/data/pengisi')
  }

  // TODO: data hasil
  public hasil({ view }) {
    return view.render('pasca/s2/data/hasil')
  }
  // TODO: import user monitoring
  public importuser({ view }) {
    return view.render('pasca/s2/data/import_user')
  }
}
