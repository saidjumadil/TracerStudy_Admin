import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const routeName: string = 'profesi.'
export default class ProfesiSuperAdmin {
  public async handle({ response, auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.authenticate()
    // console.log(auth)
    if ([1].includes(auth.user?.permission_profesi as number)) {
      return await next()
    }

    return response.redirect().toRoute('admin.' + routeName + 'index')
  }
}
