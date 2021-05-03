'use strict'

class AdminsController {
  index({ request, response, view }) {
    return view.render('admin/index')
  }
  sasaran({ request, response, view }) {
    return view.render('admin/sasaran')
  }
  jadwal({ request, response, view }) {
    return view.render('admin/jadwal')
  }
  sms({ request, response, view }) {
    return view.render('admin/sms')
  }
}

module.exports = AdminsController
