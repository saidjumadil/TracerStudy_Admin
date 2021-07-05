import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const routeName: string = 'd3.'
export default class ProfesiAuth {
  public async handle({ response, auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.authenticate()
    // console.log(auth)
    if (auth.user?.permission_profesi === 0) {
      return response.redirect().toRoute('admin.' + routeName + 'index')
    }

    return await next()
  }
}
