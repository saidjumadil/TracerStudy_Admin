export default class D3AdminResponsController {
  // TODO: data pengisi
  public pengisi({ view }) {
    return view.render('d3/data/pengisi')
  }

  // TODO: data hasil
  public hasil({ view }) {
    return view.render('d3/data/hasil')
  }
  // TODO: import user monitoring
  public importuser({ view }) {
    return view.render('d3/data/import_user')
  }
}
