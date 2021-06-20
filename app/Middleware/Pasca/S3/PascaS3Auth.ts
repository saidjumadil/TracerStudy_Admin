import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const routeName: string = 'profesi.'
export default class PascaS3Auth {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.authenticate()
    // console.log(auth)
    if (auth.user?.permission_pasca_s3 === 0) {
      return response.redirect().toRoute('admin.' + routeName + 'index')
    }

    return await next()
  }
}
