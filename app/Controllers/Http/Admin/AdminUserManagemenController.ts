export default class AdminUserManagemenController {
  public tambah_admin({ view }) {
    return view.render('admin/managemen/tambah_admin')
  }
  public tambah_operator({ view }) {
    return view.render('admin/managemen/tambah_operator')
  }
  public tambah_akunresponden({ view }) {
    return view.render('admin/managemen/tambah_akunresponden')
  }
  public edit_dataresponden({ view }) {
    return view.render('admin/managemen/edit_dataresponden')
  }
}
