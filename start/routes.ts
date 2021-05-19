import Route from '@ioc:Adonis/Core/Route'

// authentikasi
Route.group(() => {
  Route.get('', 'Admin/AuthController.index').as('login')
  Route.post('', 'Admin/AuthController.authentication').as('authentication_admin')

  Route.get('logout', 'Admin/AuthController.logout').as('logout')
}).as('auth')

// admin side
Route.group(() => {
  // beranda
  Route.get('', 'Admin/AdminsController.index').as('index')

  // data
  Route.group(() => {
    Route.get('pengisi', 'Admin/AdminResponsController.pengisi').as('pengisi')
    Route.get('hasil', 'Admin/AdminResponsController.hasil').as('hasil')
    Route.get('importuser', 'Admin/AdminResponsController.importuser').as('importuser')
  })
    .prefix('data')
    .as('data')

  // user managemen
  Route.group(() => {
    Route.group(() => {
      Route.get('admin', 'Admin/AdminUserManagemenController.tambah_admin').as('admin')
      Route.get('operator', 'Admin/AdminUserManagemenController.tambah_operator').as('operator')
      Route.get('akunresponden', 'Admin/AdminUserManagemenController.tambah_akunresponden').as(
        'akunresponden'
      )
    })
      .prefix('tambah')
      .as('tambah')

    Route.get('edit/dataresponden', 'Admin/AdminUserManagemenController.edit_dataresponden').as(
      'edit.dataresponden'
    )
  })
    .prefix('managemen')
    .as('managemen')

  // ubah sasaran,ubah jadwal,sms
  Route.get('sasaran', 'Admin/AdminsController.sasaran').as('sasaran')
  Route.get('jadwal', 'Admin/AdminsController.jadwal').as('jadwal')
  Route.get('sms', 'Admin/AdminsController.sms').as('sms')
})
  .prefix('admin')
  .as('admin')
