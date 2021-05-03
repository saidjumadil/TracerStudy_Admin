'use strict'

class AdminUserManagemenController {
  tambah_admin({ request, response, view }) {
    return view.render('admin/managemen/tambah_admin')
  }
  tambah_operator({ request, response, view }) {
    return view.render('admin/managemen/tambah_operator')
  }
  tambah_akunresponden({ request, response, view }) {
    return view.render('admin/managemen/tambah_akunresponden')
  }
  edit_dataresponden({ request, response, view }) {
    return view.render('admin/managemen/edit_dataresponden')
  }
}

module.exports = AdminUserManagemenController
