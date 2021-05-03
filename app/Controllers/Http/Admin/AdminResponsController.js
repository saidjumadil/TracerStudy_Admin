'use strict'

class AdminResponsController {
  // TODO: data pengisi
  pengisi({ request, response, view }) {
    return view.render('admin/data/pengisi')
  }

  // TODO: data hasil
  hasil({ request, response, view }) {
    return view.render('admin/data/hasil')
  }
  // TODO: import user monitoring
  importuser({ request, response, view }) {
    return view.render('admin/data/import_user')
  }
}

module.exports = AdminResponsController
