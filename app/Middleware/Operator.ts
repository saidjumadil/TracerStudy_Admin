import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const routeName: string = 'd3.'
export default class Operator {
  public async handle({ response, auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.authenticate()
    // console.log(auth)
    if ([1, 2].includes(auth.user?.legacy_role as number)) {
      return await next()
    }

    return response.redirect().toRoute('admin.' + routeName + 'index')
  }
}
