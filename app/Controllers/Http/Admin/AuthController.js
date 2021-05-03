'use strict'

class AuthController {
  index({ view }) {
    return view.render('admin/login')
  }

  async authentication({ auth, request }) {
    const { nim, password } = request.all()
    const user = await auth.attempt(nim, password)
    console.log(user)
    if (user) {
      return view.render('admin/index')
    } else {
      //TODO: buat misc
    }
  }

  async logout({ auth, response }) {
    try {
      await auth.logout()
      return response.route('auth.login_mhs')
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = AuthController
