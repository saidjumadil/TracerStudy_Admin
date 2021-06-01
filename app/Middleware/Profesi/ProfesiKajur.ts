import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const routeName: string = 'profesi.'
export default class ProfesiKajur {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.authenticate()
    // console.log(auth)
    if ([1, 2, 3].includes(auth.user?.permission_profesi as number)) {
      await next()
    }

    return response.redirect().toRoute('admin.' + routeName + 'index')
  }
}