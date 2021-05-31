const renderName: string = 'pasca/s3'
export default class PascaS3AdminUserManagemenController {
  public async tambah_admin({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/managemen/tambah_admin')
  }
  public async tambah_operator({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/managemen/tambah_operator')
  }
  public async tambah_akunresponden({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/managemen/tambah_akunresponden')
  }
  public async edit_dataresponden({ view, auth }) {
    await auth.authenticate()
    return view.render(renderName + '/managemen/edit_dataresponden')
  }
}
