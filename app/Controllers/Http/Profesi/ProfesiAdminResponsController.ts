export default class ProfesiAdminResponsController {
  // TODO: data pengisi
  public pengisi({ view }) {
    return view.render('profesi/data/pengisi')
  }

  // TODO: data hasil
  public hasil({ view }) {
    return view.render('profesi/data/hasil')
  }
  // TODO: import user monitoring
  public importuser({ view }) {
    return view.render('profesi/data/import_user')
  }
}
