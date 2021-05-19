export default class AuthController {
  public index({ view }) {
    return view.render('admin/login')
  }

  public async authentication({ auth, request, view }) {
    const { nim, password } = request.all()
    const user = await auth.attempt(nim, password)
    console.log(user)
    if (user) {
      return view.render('admin/index')
    } else {
      //TODO: buat misc
    }
  }

  public async logout({ auth, response }) {
    try {
      await auth.logout()
      return response.redirect().toRoute('auth.login')
    } catch (e) {
      console.log(e)
    }
  }
}
