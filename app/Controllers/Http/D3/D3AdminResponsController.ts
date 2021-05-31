/* eslint-disable @typescript-eslint/naming-convention *//* eslint-disable prettier/prettier */
import Services from "App/Models/D3/D3Services"

export default class D3AdminResponsController {
  // TODO: data pengisi
  public async pengisi({ view }) {
    //TODO : untuk lemparkan langsung fakultas ke edge
    const GetFakultas = await Services.get_fakultas()

    return view.render('d3/data/pengisi', { GetFakultas })
  }

  // TODO: data hasil
  public hasil({ view }) {
    return view.render('d3/data/hasil')
  }

  // TODO: import user monitoring
  public importuser({ view }) {
    return view.render('d3/data/import_user')
  }

  public async ajax_prodi({request}){
    try {
      const {id_fakultas} = request.all()
      const GetProdi = await Services.get_prodi(id_fakultas)
      return GetProdi
    } catch (error) {
      console.log(error);
    }
  }

}
