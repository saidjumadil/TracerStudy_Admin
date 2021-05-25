export default class ProfesiAdminUserManagemenController {
  public tambah_admin({ view }) {
    return view.render('profesi/managemen/tambah_admin')
  }
  public tambah_operator({ view }) {
    return view.render('profesi/managemen/tambah_operator')
  }
  public tambah_akunresponden({ view }) {
    return view.render('profesi/managemen/tambah_akunresponden')
  }
  public edit_dataresponden({ view }) {
    return view.render('profesi/managemen/edit_dataresponden')
  }
}
