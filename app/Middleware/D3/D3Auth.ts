import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const routeName: string = 'pasca.s2.'
export default class D3Auth {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.authenticate()
    // console.log(auth)
    if (auth.user?.permission_d3 === 0) {
      return response.redirect().toRoute('admin.' + routeName + 'index')
    }

    await next()
  }
}
