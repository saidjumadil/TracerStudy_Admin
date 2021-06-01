import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    try {
      await auth.authenticate()
      return response.redirect().toRoute('admin.d3.index')
    } catch (error) {
      // console.log(error)
      await next()
    }
  }
}
