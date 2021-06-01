import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const routeName: string = 'd3.'
export default class D3Enum {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.authenticate()
    // console.log(auth)
    if ([1, 2, 4].includes(auth.user?.permission_d3 as number)) {
      await next()
    }

    return response.redirect().toRoute('admin.' + routeName + 'index')
  }
}
