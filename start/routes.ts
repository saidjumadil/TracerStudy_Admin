/* eslint-disable prettier/prettier */
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
  // d3
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

    //sasaran
    Route.get('sasaran', 'D3/D3AdminsController.sasaran').as('sasaran')
    Route.post('sasaran', 'D3/D3AdminsController.set_sasaran').as('set_sasaran') //TODO: Pakai route ini untuk action form set jadwal
    Route.post('ajax-cek-populasi', 'D3/D3AdminsController.cek_populasi').as('cek_populasi') // TODO: ajax cek populasi
    Route.post('ajax-get-populasi', 'D3/D3AdminsController.insert_populasi').as('get_populasi') // TODO: ajax ambil populasi dari api dan simpan ke db
    
    //jadwal
    Route.get('jadwal', 'D3/D3AdminsController.jadwal').as('jadwal')
    Route.post('jadwal', 'D3/D3AdminsController.set_jadwal').as('set_jadwal') //TODO: action form set jadwal

    //sms
    Route.get('sms', 'D3/D3AdminsController.sms').as('sms')

    //ajax get prodi
    Route.post('ajax-prodi','D3/D3AdminResponsController.ajax_prodi').as('get_prodi') //TODO: ajax get prodi

  })
    .prefix('d3')
    .as('d3')

  // pasca
  Route.group(() => {
    // s2
    Route.group(() => {
      // beranda
      Route.get('', 'Pasca/S2/PascaS2AdminsController.index').as('index')

      // data
      Route.group(() => {
        Route.get('pengisi', 'Pasca/S2/PascaS2AdminResponsController.pengisi').as('pengisi')
        Route.get('hasil', 'Pasca/S2/PascaS2AdminResponsController.hasil').as('hasil')
        Route.get('importuser', 'Pasca/S2/PascaS2AdminResponsController.importuser').as(
          'importuser'
        )
      })
        .prefix('data')
        .as('data')

      // user managemen
      Route.group(() => {
        Route.group(() => {
          Route.get('admin', 'Pasca/S2/PascaS2AdminUserManagemenController.tambah_admin').as(
            'admin'
          )
          Route.get('operator', 'Pasca/S2/PascaS2AdminUserManagemenController.tambah_operator').as(
            'operator'
          )
          Route.get(
            'akunresponden',
            'Pasca/S2/PascaS2AdminUserManagemenController.tambah_akunresponden'
          ).as('akunresponden')
        })
          .prefix('tambah')
          .as('tambah')

        Route.get(
          'edit/dataresponden',
          'Pasca/S2/PascaS2AdminUserManagemenController.edit_dataresponden'
        ).as('edit.dataresponden')
      })
        .prefix('managemen')
        .as('managemen')

      // ubah sasaran,ubah jadwal,sms
      Route.get('sasaran', 'Pasca/S2/PascaS2AdminsController.sasaran').as('sasaran')
      Route.get('jadwal', 'Pasca/S2/PascaS2AdminsController.jadwal').as('jadwal')
      Route.get('sms', 'Pasca/S2/PascaS2AdminsController.sms').as('sms')
    })
      .prefix('s2')
      .as('s2')

    // s3
    Route.group(() => {
      // beranda
      Route.get('', 'Pasca/S3/PascaS3AdminsController.index').as('index')

      // data
      Route.group(() => {
        Route.get('pengisi', 'Pasca/S3/PascaS3AdminResponsController.pengisi').as('pengisi')
        Route.get('hasil', 'Pasca/S3/PascaS3AdminResponsController.hasil').as('hasil')
        Route.get('importuser', 'Pasca/S3/PascaS3AdminResponsController.importuser').as(
          'importuser'
        )
      })
        .prefix('data')
        .as('data')

      // user managemen
      Route.group(() => {
        Route.group(() => {
          Route.get('admin', 'Pasca/S3/PascaS3AdminUserManagemenController.tambah_admin').as(
            'admin'
          )
          Route.get('operator', 'Pasca/S3/PascaS3AdminUserManagemenController.tambah_operator').as(
            'operator'
          )
          Route.get(
            'akunresponden',
            'Pasca/S3/PascaS3AdminUserManagemenController.tambah_akunresponden'
          ).as('akunresponden')
        })
          .prefix('tambah')
          .as('tambah')

        Route.get(
          'edit/dataresponden',
          'Pasca/S3/PascaS3AdminUserManagemenController.edit_dataresponden'
        ).as('edit.dataresponden')
      })
        .prefix('managemen')
        .as('managemen')

      // ubah sasaran,ubah jadwal,sms
      Route.get('sasaran', 'Pasca/S3/PascaS3AdminsController.sasaran').as('sasaran')
      Route.get('jadwal', 'Pasca/S3/PascaS3AdminsController.jadwal').as('jadwal')
      Route.get('sms', 'Pasca/S3/PascaS3AdminsController.sms').as('sms')
    })
      .prefix('s3')
      .as('s3')
  })
    .prefix('pasca')
    .as('pasca')

  // profesi
  Route.group(() => {
    // beranda
    Route.get('', 'Profesi/ProfesiAdminsController.index').as('index')

    // data
    Route.group(() => {
      Route.get('pengisi', 'Profesi/ProfesiAdminResponsController.pengisi').as('pengisi')
      Route.get('hasil', 'Profesi/ProfesiAdminResponsController.hasil').as('hasil')
      Route.get('importuser', 'Profesi/ProfesiAdminResponsController.importuser').as('importuser')
    })
      .prefix('data')
      .as('data')

    // user managemen
    Route.group(() => {
      Route.group(() => {
        Route.get('admin', 'Profesi/ProfesiAdminUserManagemenController.tambah_admin').as('admin')
        Route.get('operator', 'Profesi/ProfesiAdminUserManagemenController.tambah_operator').as(
          'operator'
        )
        Route.get(
          'akunresponden',
          'Profesi/ProfesiAdminUserManagemenController.tambah_akunresponden'
        ).as('akunresponden')
      })
        .prefix('tambah')
        .as('tambah')

      Route.get(
        'edit/dataresponden',
        'Profesi/ProfesiAdminUserManagemenController.edit_dataresponden'
      ).as('edit.dataresponden')
    })
      .prefix('managemen')
      .as('managemen')

    // ubah sasaran,ubah jadwal,sms
    Route.get('sasaran', 'Profesi/ProfesiAdminsController.sasaran').as('sasaran')
    Route.get('jadwal', 'Profesi/ProfesiAdminsController.jadwal').as('jadwal')
    Route.get('sms', 'Profesi/ProfesiAdminsController.sms').as('sms')
  })
    .prefix('profesi')
    .as('profesi')
})
  .prefix('admin')
  .as('admin')
