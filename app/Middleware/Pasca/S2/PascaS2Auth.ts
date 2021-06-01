import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const routeName: string = 'pasca.s3.'
export default class PascaS2Auth {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.authenticate()
    // console.log(auth)
    if (auth.user?.permission_pasca_s2 === 0) {
      return response.redirect().toRoute('admin.' + routeName + 'index')
    }

    await next()
  }
}
