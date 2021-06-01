import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class User {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    try {
      await auth.authenticate()
      await next()
    } catch (error) {
      return response.redirect().toRoute('auth.login')
    }
  }
}
