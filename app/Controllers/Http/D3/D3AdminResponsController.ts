/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Services from 'App/Models/D3/D3Services'

export default class D3AdminResponsController {
//TODO : tambahkan dropdown periode
  public async pengisi({ view, auth }) {
    await auth.authenticate()
    const GetFakultas = await Services.get_fakultas()
    return view.render('d3/data/pengisi', { GetFakultas })
  }

  public async hasil({ view, auth }) {
    await auth.authenticate()
    return view.render('d3/data/hasil')
  }

  public async importuser({ view, auth }) {
    await auth.authenticate()

    return view.render('d3/data/import_user')
  }

  //TODO : tambahkan dropdown periode
  //import user store
  public async store_monitoring({request}){
    try {
     // let {tahun, periode} = request.all()
      // let tahun_monitoring = tahun.concact(periode)
      let tahun_monitoring= '20150'
      //function store
      const store_monitoring = await Services.insert_monitoring(tahun_monitoring) 
      if(store_monitoring){
        return true

      }
    } catch (error) {
      console.log(error);
      
    }
  }

  public async ajax_prodi({ request }) {
    try {
      const { id_fakultas } = request.all()
      const GetProdi = await Services.get_prodi(id_fakultas)
      return GetProdi
    } catch (error) {
      console.log(error)
    }
  }
}
