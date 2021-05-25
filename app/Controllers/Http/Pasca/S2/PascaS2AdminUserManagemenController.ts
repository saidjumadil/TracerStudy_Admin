export default class PascaS2AdminUserManagemenController {
  public tambah_admin({ view }) {
    return view.render('pasca/s2/managemen/tambah_admin')
  }
  public tambah_operator({ view }) {
    return view.render('pasca/s2/managemen/tambah_operator')
  }
  public tambah_akunresponden({ view }) {
    return view.render('pasca/s2/managemen/tambah_akunresponden')
  }
  public edit_dataresponden({ view }) {
    return view.render('pasca/s2/managemen/edit_dataresponden')
  }
}
