/* eslint-disable prettier/prettier */
export default class D3AdminUserManagemenController {
  public async tambah_admin({ view, auth }) {
    await auth.authenticate()

    return view.render('d3/managemen/tambah_admin')
  }
  public async tambah_operator({ view, auth }) {
    await auth.authenticate()

    return view.render('d3/managemen/tambah_operator')
  }
  public async tambah_akunresponden({ view, auth }) {
    await auth.authenticate()

    return view.render('d3/managemen/tambah_akunresponden')
  }
  public async edit_dataresponden({ view, auth }) {
    await auth.authenticate()

    return view.render('d3/managemen/edit_dataresponden')
  }
}
