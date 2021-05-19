export default class AdminResponsController {
  // TODO: data pengisi
  public pengisi({ request, response, view }) {
    return view.render('admin/data/pengisi')
  }

  // TODO: data hasil
  public hasil({ request, response, view }) {
    return view.render('admin/data/hasil')
  }
  // TODO: import user monitoring
  public importuser({ request, response, view }) {
    return view.render('admin/data/import_user')
  }
}
