export default class PascaS3AdminResponsController {
  // TODO: data pengisi
  public pengisi({ view }) {
    return view.render('pasca/s3/data/pengisi')
  }

  // TODO: data hasil
  public hasil({ view }) {
    return view.render('pasca/s3/data/hasil')
  }
  // TODO: import user monitoring
  public importuser({ view }) {
    return view.render('pasca/s3/data/import_user')
  }
}
