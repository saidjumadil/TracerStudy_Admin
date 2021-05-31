/* eslint-disable prettier/prettier */
export default class D3AdminUserManagemenController {
  public tambah_admin({ view }) {
    return view.render('d3/managemen/tambah_admin')
  }
  public tambah_operator({ view }) {
    return view.render('d3/managemen/tambah_operator')
  }
  public tambah_akunresponden({ view }) {
    return view.render('d3/managemen/tambah_akunresponden')
  }
  public edit_dataresponden({ view }) {
    return view.render('d3/managemen/edit_dataresponden')
  }
}
