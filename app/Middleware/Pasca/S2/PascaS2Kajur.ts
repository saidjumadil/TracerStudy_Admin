import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const routeName: string = 'pasca.s2.'
export default class PascaS2Kajur {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.authenticate()
    // console.log(auth)
    if ([1, 2, 3].includes(auth.user?.permission_pasca_s2 as number)) {
      await next()
    }

    return response.redirect().toRoute('admin.' + routeName + 'index')
  }
}