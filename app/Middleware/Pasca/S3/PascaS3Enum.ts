import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const routeName: string = 'pasca.s3.'
export default class PascaS3Enum {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.authenticate()
    // console.log(auth)
    if ([1, 2, 4].includes(auth.user?.permission_pasca_s3 as number)) {
      return await next()
    }

    return response.redirect().toRoute('admin.' + routeName + 'index')
  }
}
