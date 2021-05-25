export default class AuthController {
  public index({ view }) {
    return view.render('login')
  }

  public async authentication({ auth, request, response }) {
    const { nim, password } = request.all()
    const user = await auth.attempt(nim, password)
    console.log(user)
    if (user) {
      return response.redirect().toRoute('admin.d3.index')
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
