/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'
import './hook'

//testing
Route.get('testing-import','D3/D3AdminResponsController.store_monitoring')

// authentikasi
Route.group(() => {
  Route.group(() => {
    Route.get('', 'AuthController.index').as('login')
    Route.post('', 'AuthController.authentication').as('authentication')
  }).middleware(['guest'])

  Route.group(() => {
    Route.get('logout', 'AuthController.logout').as('logout')
    Route.group(() => {
      Route.get('', 'AuthController.FormUbahPassword').as('ubah_password')
      Route.post('', 'AuthController.ActionUbahPassword').as('post_ubah_password')
    }).prefix('ubah_password')
  }).middleware(['user'])
}).as('auth')

// admin side
Route.group(() => {
  Route.group(() => {
    Route.get('', 'OperatorController.get_operator').as('operator')
    Route.post('', 'OperatorController.update_users').as('ubah_operator')

    Route.post('tambah', 'OperatorController.register_users').as('store_operator')
    Route.post('reset_password', 'OperatorController.reset_password').as('reset_password')
  }).prefix('operator')
  // d3
  Route.group(() => {
    // beranda
    Route.get('', 'D3/D3AdminsController.index').as('index')

    Route.group(() => {
      Route.get('', 'D3/D3PengumummanController.get_pengumuman').as('pengumuman')
      Route.post('', 'D3/D3PengumummanController.update_pengumuman').as('ubah_pengumuman')
    }).prefix('pengumuman')

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
    Route.post('sasaran', 'D3/D3AdminsController.set_sasaran').as('set_sasaran')
    Route.post('ajax-cek-populasi', 'D3/D3AdminsController.cek_populasi').as('cek_populasi')
    Route.post('ajax-get-populasi', 'D3/D3AdminsController.insert_populasi').as('get_populasi')

    //jadwal
    Route.get('jadwal', 'D3/D3AdminsController.jadwal').as('jadwal')
    Route.post('jadwal', 'D3/D3AdminsController.set_jadwal').as('set_jadwal')

    //sms
    Route.get('sms', 'D3/D3AdminsController.sms').as('sms')

    //ajax get prodi
    Route.post('ajax-prodi', 'D3/D3AdminResponsController.ajax_prodi').as('get_prodi')
  })
    .prefix('d3')
    .as('d3')
    .middleware(['d3Auth'])

  // pasca
  Route.group(() => {
    // s2
    Route.group(() => {
      // beranda
      Route.get('', 'Pasca/S2/PascaS2AdminsController.index').as('index')

      // pengumuman
      Route.group(() => {
        Route.get('', 'Pasca/S2/PascaS2PengumummanController.get_pengumuman').as('pengumuman')
        Route.post('', 'Pasca/S2/PascaS2PengumummanController.update_pengumuman').as(
          'ubah_pengumuman'
        )
      }).prefix('pengumuman')
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

      //sasaran
      Route.get('sasaran', 'Pasca/S2/PascaS2AdminsController.sasaran').as('sasaran')
      Route.post('sasaran', 'Pasca/S2/PascaS2AdminsController.set_sasaran').as('set_sasaran')
      Route.post('ajax-cek-populasi', 'Pasca/S2/PascaS2AdminsController.cek_populasi').as(
        'cek_populasi'
      )
      Route.post('ajax-get-populasi', 'Pasca/S2/PascaS2AdminsController.insert_populasi').as(
        'get_populasi'
      )

      //jadwal
      Route.get('jadwal', 'Pasca/S2/PascaS2AdminsController.jadwal').as('jadwal')
      Route.post('jadwal', 'Pasca/S2/PascaS2AdminsController.set_jadwal').as('set_jadwal')

      //sms
      Route.get('sms', 'Pasca/S2/PascaS2AdminsController.sms').as('sms')

      //ajax get prodi
      Route.post('ajax-prodi', 'Pasca/S2/PascaS2AdminResponsController.ajax_prodi').as('get_prodi')
    })
      .prefix('s2')
      .as('s2')
      .middleware(['pascaS2Auth'])

    // s3
    Route.group(() => {
      // beranda
      Route.get('', 'Pasca/S3/PascaS3AdminsController.index').as('index')

      // pengumuman
      Route.group(() => {
        Route.get('', 'Pasca/S3/PascaS3PengumummanController.get_pengumuman').as('pengumuman')
        Route.post('', 'Pasca/S3/PascaS3PengumummanController.update_pengumuman').as(
          'ubah_pengumuman'
        )
      }).prefix('pengumuman')
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

      //sasaran
      Route.get('sasaran', 'Pasca/S3/PascaS3AdminsController.sasaran').as('sasaran')
      Route.post('sasaran', 'Pasca/S3/PascaS3AdminsController.set_sasaran').as('set_sasaran')
      Route.post('ajax-cek-populasi', 'Pasca/S3/PascaS3AdminsController.cek_populasi').as(
        'cek_populasi'
      )
      Route.post('ajax-get-populasi', 'Pasca/S3/PascaS3AdminsController.insert_populasi').as(
        'get_populasi'
      )

      //jadwal
      Route.get('jadwal', 'Pasca/S3/PascaS3AdminsController.jadwal').as('jadwal')
      Route.post('jadwal', 'Pasca/S3/PascaS3AdminsController.set_jadwal').as('set_jadwal')

      //sms
      Route.get('sms', 'Pasca/S3/PascaS3AdminsController.sms').as('sms')

      //ajax get prodi
      Route.post('ajax-prodi', 'Pasca/S3/PascaS3AdminResponsController.ajax_prodi').as('get_prodi')
    })
      .prefix('s3')
      .as('s3')
      .middleware(['pascaS3Auth'])
  })
    .prefix('pasca')
    .as('pasca')

  // profesi
  Route.group(() => {
    // beranda
    Route.get('', 'Profesi/ProfesiAdminsController.index').as('index')
    // pengumuman
    Route.group(() => {
      Route.get('', 'Profesi/ProfesiPengumummanController.get_pengumuman').as('pengumuman')
      Route.post('', 'Profesi/ProfesiPengumummanController.update_pengumuman').as('ubah_pengumuman')
    }).prefix('pengumuman')
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

    //sasaran
    Route.get('sasaran', 'Profesi/ProfesiAdminsController.sasaran').as('sasaran')
    Route.post('sasaran', 'Profesi/ProfesiAdminsController.set_sasaran').as('set_sasaran')
    Route.post('ajax-cek-populasi', 'Profesi/ProfesiAdminsController.cek_populasi').as(
      'cek_populasi'
    )
    Route.post('ajax-get-populasi', 'Profesi/ProfesiAdminsController.insert_populasi').as(
      'get_populasi'
    )

    //jadwal
    Route.get('jadwal', 'Profesi/ProfesiAdminsController.jadwal').as('jadwal')
    Route.post('jadwal', 'Profesi/ProfesiAdminsController.set_jadwal').as('set_jadwal')

    //sms
    Route.get('sms', 'Profesi/ProfesiAdminsController.sms').as('sms')

    //ajax get prodi
    Route.post('ajax-prodi', 'Profesi/ProfesiAdminResponsController.ajax_prodi').as('get_prodi')
  })
    .prefix('profesi')
    .as('profesi')
    .middleware(['profesiAuth'])
})
  .prefix('admin')
  .as('admin')
  .middleware(['user'])
