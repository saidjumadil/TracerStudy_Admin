import Route from '@ioc:Adonis/Core/Route'
import './hook'

// authentikasi
Route.group(() => {
  Route.get('', 'AuthController.index').as('login')
  Route.post('', 'AuthController.authentication').as('authentication_admin')

  Route.get('logout', 'AuthController.logout').as('logout')
}).as('auth')

// admin side
Route.group(() => {
  Route.group(() => {
    // beranda
    Route.get('', 'D3/D3AdminsController.index').as('index')

    // data
    Route.group(() => {
      Route.get('pengisi', 'D3/D3AdminResponsController.pengisi').as('pengisi')
      Route.get('hasil', 'D3/D3AdminResponsController.hasil').as('hasil')
      Route.get('importuser', 'D3/D3AdminResponsController.importuser').as('importuser')
    })
      .prefix('data')
      .as('data')

    // user managemen
    Route.group(() => {
      Route.group(() => {
        Route.get('admin', 'D3/D3AdminUserManagemenController.tambah_admin').as('admin')
        Route.get('operator', 'D3/D3AdminUserManagemenController.tambah_operator').as('operator')
        Route.get('akunresponden', 'D3/D3AdminUserManagemenController.tambah_akunresponden').as(
          'akunresponden'
        )
      })
        .prefix('tambah')
        .as('tambah')

      Route.get('edit/dataresponden', 'D3/D3AdminUserManagemenController.edit_dataresponden').as(
        'edit.dataresponden'
      )
    })
      .prefix('managemen')
      .as('managemen')

    // ubah sasaran,ubah jadwal,sms
    Route.get('sasaran', 'D3/D3AdminsController.sasaran').as('sasaran')
    Route.get('jadwal', 'D3/D3AdminsController.jadwal').as('jadwal')
    Route.get('sms', 'D3/D3AdminsController.sms').as('sms')
  })
    .prefix('d3')
    .as('d3')
})
  .prefix('admin')
  .as('admin')
