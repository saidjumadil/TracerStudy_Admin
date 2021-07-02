import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class User {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    try {
      await auth.authenticate()
      return await next()
    } catch (error) {
      console.log(error)
      return response.redirect().toRoute('auth.login')
    }
  }
}
