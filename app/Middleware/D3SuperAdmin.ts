import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class D3SuperAdmin {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.authenticate()
    console.log(auth)
    if (auth.user?.permission_d3 !== 1) {
      return response.redirect().toRoute('admin.pasca.s2.index')
    }

    await next()
  }
}
