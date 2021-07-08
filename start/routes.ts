/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import './hook'

Route.group(() => {
  // authentikasi
  Route.group(() => {
    Route.group(() => {
      Route.get('', 'AuthController.index').as('login')
      Route.post('', 'AuthController.authentication').as('authentication')
      Route.post('lupapassword', 'AuthController.ActionLupaPassword').as('actionLupaPassword')
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
      Route.post('hapus_user', 'OperatorController.hapus_user').as('hapus_user')
    })
      .prefix('operator')
      .middleware(['operator'])
    // d3
    Route.group(() => {
      // beranda
      Route.get('', 'D3/D3AdminsController.index').as('index')

      Route.group(() => {
        Route.get('', 'D3/D3PengumummanController.get_pengumuman').as('pengumuman')
        Route.post('', 'D3/D3PengumummanController.update_pengumuman').as('ubah_pengumuman')
        // file upload
        Route.post('upload-image', 'D3/D3PengumummanController.upload_image').as('upload_image')
      }).prefix('pengumuman')

      // data
      Route.group(() => {
        Route.group(() => {
          Route.get('', 'D3/D3AdminResponsController.pengisi').as('pengisi')
          Route.post('', 'D3/D3AdminResponsController.update_data_pengisi').as(
            'update_data_pengisi'
          )
        })
          .prefix('pengisi')
          .middleware(['d3Enum'])

        Route.group(() => {
          Route.get('', 'D3/D3AdminResponsController.hasil').as('hasil')
          Route.post('', 'D3/D3AdminResponsController.export_hasil_users').as('export_hasil_users')
        })
          .prefix('hasil')
          .middleware(['d3Kajur'])

        Route.group(() => {
          Route.get('', 'D3/D3AdminResponsController.importuser').as('importuser')
          Route.post('', 'D3/D3AdminResponsController.store_monitoring').as('store_monitoring')
        })
          .prefix('importuser')
          .middleware(['d3Admin', 'd3Step3'])
      })
        .prefix('data')
        .as('data')

      // user managemen
      Route.group(() => {
        Route.group(() => {
          Route.get('', 'D3/D3AdminUserManagemenController.edit_dataresponden').as('dataresponden')
          Route.post('', 'D3/D3AdminUserManagemenController.edit_responden').as('edit_responden')
        })
          .prefix('edit/dataresponden')
          .as('edit')
        Route.group(() => {
          Route.get('', 'D3/D3AdminUserManagemenController.view_tambah_responden').as(
            'dataresponden'
          )
          Route.post('', 'D3/D3AdminUserManagemenController.insert_responden').as(
            'tambah_responden'
          )
        })
          .prefix('tambah/dataresponden')
          .as('tambah')
      })
        .prefix('managemen')
        .as('managemen')
        .middleware(['d3Enum'])

      Route.group(() => {
        Route.group(() => {
          //sasaran
          Route.get('sasaran', 'D3/D3AdminsController.sasaran').as('sasaran')
          Route.post('sasaran', 'D3/D3AdminsController.set_sasaran').as('set_sasaran')
        }).middleware(['d3Step12'])

        Route.group(() => {
          //jadwal
          Route.get('jadwal', 'D3/D3AdminsController.jadwal').as('jadwal')
          Route.post('jadwal', 'D3/D3AdminsController.set_jadwal').as('set_jadwal')
        }).middleware(['d3Step4'])
      }).middleware(['d3Admin'])

      //ajax
      Route.get('ajax-prodi', 'D3/D3AdminResponsController.ajax_prodi').as('get_prodi')
      Route.get('ajax-data-pengisi', 'D3/D3AdminResponsController.ajax_data_pengisi').as(
        'get_data_pengisi'
      )
      Route.post('ajax-cek-populasi', 'D3/D3AdminsController.cek_populasi').as('cek_populasi')
      Route.post('ajax-get-populasi', 'D3/D3AdminsController.insert_populasi').as('get_populasi')
      Route.get('ajax-data-index', 'D3/D3AdminsController.ajax_data_index').as('get_data_index')
      Route.get('ajax-get-responden', 'D3/D3AdminUserManagemenController.ajax_get_responden').as(
        'get_responden'
      )
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

        Route.group(() => {
          Route.get('', 'Pasca/S2/PascaS2PengumummanController.get_pengumuman').as('pengumuman')
          Route.post('', 'Pasca/S2/PascaS2PengumummanController.update_pengumuman').as(
            'ubah_pengumuman'
          )
          // file upload
          Route.post('upload-image', 'Pasca/S2/PascaS2PengumummanController.upload_image').as(
            'upload_image'
          )
        }).prefix('pengumuman')

        // data
        Route.group(() => {
          Route.group(() => {
            Route.get('', 'Pasca/S2/PascaS2AdminResponsController.pengisi').as('pengisi')
            Route.post('', 'Pasca/S2/PascaS2AdminResponsController.update_data_pengisi').as(
              'update_data_pengisi'
            )
          })
            .prefix('pengisi')
            .middleware(['pascaS2Enum'])

          Route.group(() => {
            Route.get('', 'Pasca/S2/PascaS2AdminResponsController.hasil').as('hasil')
            Route.post('', 'Pasca/S2/PascaS2AdminResponsController.export_hasil_users').as(
              'export_hasil_users'
            )
          })
            .prefix('hasil')
            .middleware(['pascaS2Kajur'])

          Route.group(() => {
            Route.get('', 'Pasca/S2/PascaS2AdminResponsController.importuser').as('importuser')
            Route.post('', 'Pasca/S2/PascaS2AdminResponsController.store_monitoring').as(
              'store_monitoring'
            )
          })
            .prefix('importuser')
            .middleware(['pascaS2Admin', 'pascaS2Step3'])
        })
          .prefix('data')
          .as('data')

        // user managemen
        Route.group(() => {
          Route.group(() => {
            Route.get('', 'Pasca/S2/PascaS2AdminUserManagemenController.edit_dataresponden').as(
              'dataresponden'
            )
            Route.post('', 'Pasca/S2/PascaS2AdminUserManagemenController.edit_responden').as(
              'edit_responden'
            )
          })
            .prefix('edit/dataresponden')
            .as('edit')
          Route.group(() => {
            Route.get('', 'Pasca/S2/PascaS2AdminUserManagemenController.view_tambah_responden').as(
              'dataresponden'
            )
            Route.post('', 'Pasca/S2/PascaS2AdminUserManagemenController.insert_responden').as(
              'tambah_responden'
            )
          })
            .prefix('tambah/dataresponden')
            .as('tambah')
        })
          .prefix('managemen')
          .as('managemen')
          .middleware(['pascaS2Enum'])

        Route.group(() => {
          Route.group(() => {
            //sasaran
            Route.get('sasaran', 'Pasca/S2/PascaS2AdminsController.sasaran').as('sasaran')
            Route.post('sasaran', 'Pasca/S2/PascaS2AdminsController.set_sasaran').as('set_sasaran')
          }).middleware(['pascaS2Step12'])

          Route.group(() => {
            //jadwal
            Route.get('jadwal', 'Pasca/S2/PascaS2AdminsController.jadwal').as('jadwal')
            Route.post('jadwal', 'Pasca/S2/PascaS2AdminsController.set_jadwal').as('set_jadwal')
          }).middleware(['pascaS2Step4'])
        }).middleware(['pascaS2Admin'])

        //ajax
        Route.get('ajax-prodi', 'Pasca/S2/PascaS2AdminResponsController.ajax_prodi').as('get_prodi')
        Route.get(
          'ajax-data-pengisi',
          'Pasca/S2/PascaS2AdminResponsController.ajax_data_pengisi'
        ).as('get_data_pengisi')
        Route.post('ajax-cek-populasi', 'Pasca/S2/PascaS2AdminsController.cek_populasi').as(
          'cek_populasi'
        )
        Route.post('ajax-get-populasi', 'Pasca/S2/PascaS2AdminsController.insert_populasi').as(
          'get_populasi'
        )
        Route.get('ajax-data-index', 'Pasca/S2/PascaS2AdminsController.ajax_data_index').as(
          'get_data_index'
        )
        Route.get(
          'ajax-get-responden',
          'Pasca/S2/PascaS2AdminUserManagemenController.ajax_get_responden'
        ).as('get_responden')
      })
        .prefix('s2')
        .as('s2')
        .middleware(['pascaS2Auth'])

      // s3
      Route.group(() => {
        // beranda
        Route.get('', 'Pasca/S3/PascaS3AdminsController.index').as('index')

        Route.group(() => {
          Route.get('', 'Pasca/S3/PascaS3PengumummanController.get_pengumuman').as('pengumuman')
          Route.post('', 'Pasca/S3/PascaS3PengumummanController.update_pengumuman').as(
            'ubah_pengumuman'
          )
          // file upload
          Route.post('upload-image', 'Pasca/S3/PascaS3PengumummanController.upload_image').as(
            'upload_image'
          )
        }).prefix('pengumuman')

        // data
        Route.group(() => {
          Route.group(() => {
            Route.get('', 'Pasca/S3/PascaS3AdminResponsController.pengisi').as('pengisi')
            Route.post('', 'Pasca/S3/PascaS3AdminResponsController.update_data_pengisi').as(
              'update_data_pengisi'
            )
          })
            .prefix('pengisi')
            .middleware(['pascaS3Enum'])

          Route.group(() => {
            Route.get('', 'Pasca/S3/PascaS3AdminResponsController.hasil').as('hasil')
            Route.post('', 'Pasca/S3/PascaS3AdminResponsController.export_hasil_users').as(
              'export_hasil_users'
            )
          })
            .prefix('hasil')
            .middleware(['pascaS3Kajur'])

          Route.group(() => {
            Route.get('', 'Pasca/S3/PascaS3AdminResponsController.importuser').as('importuser')
            Route.post('', 'Pasca/S3/PascaS3AdminResponsController.store_monitoring').as(
              'store_monitoring'
            )
          })
            .prefix('importuser')
            .middleware(['pascaS3Admin', 'pascaS3Step3'])
        })
          .prefix('data')
          .as('data')

        // user managemen
        Route.group(() => {
          Route.group(() => {
            Route.get('', 'Pasca/S3/PascaS3AdminUserManagemenController.edit_dataresponden').as(
              'dataresponden'
            )
            Route.post('', 'Pasca/S3/PascaS3AdminUserManagemenController.edit_responden').as(
              'edit_responden'
            )
          })
            .prefix('edit/dataresponden')
            .as('edit')

          Route.group(() => {
            Route.get('', 'Pasca/S3/PascaS3AdminUserManagemenController.view_tambah_responden').as(
              'dataresponden'
            )
            Route.post('', 'Pasca/S3/PascaS3AdminUserManagemenController.insert_responden').as(
              'tambah_responden'
            )
          })
            .prefix('tambah/dataresponden')
            .as('tambah')
        })
          .prefix('managemen')
          .as('managemen')
          .middleware(['pascaS3Enum'])

        Route.group(() => {
          Route.group(() => {
            //sasaran
            Route.get('sasaran', 'Pasca/S3/PascaS3AdminsController.sasaran').as('sasaran')
            Route.post('sasaran', 'Pasca/S3/PascaS3AdminsController.set_sasaran').as('set_sasaran')
          }).middleware(['pascaS3Step12'])

          Route.group(() => {
            //jadwal
            Route.get('jadwal', 'Pasca/S3/PascaS3AdminsController.jadwal').as('jadwal')
            Route.post('jadwal', 'Pasca/S3/PascaS3AdminsController.set_jadwal').as('set_jadwal')
          }).middleware(['pascaS3Step4'])
        }).middleware(['pascaS3Admin'])

        //ajax
        Route.get('ajax-prodi', 'Pasca/S3/PascaS3AdminResponsController.ajax_prodi').as('get_prodi')
        Route.get(
          'ajax-data-pengisi',
          'Pasca/S3/PascaS3AdminResponsController.ajax_data_pengisi'
        ).as('get_data_pengisi')
        Route.post('ajax-cek-populasi', 'Pasca/S3/PascaS3AdminsController.cek_populasi').as(
          'cek_populasi'
        )
        Route.post('ajax-get-populasi', 'Pasca/S3/PascaS3AdminsController.insert_populasi').as(
          'get_populasi'
        )
        Route.get('ajax-data-index', 'Pasca/S3/PascaS3AdminsController.ajax_data_index').as(
          'get_data_index'
        )
        Route.get(
          'ajax-get-responden',
          'Pasca/S3/PascaS3AdminUserManagemenController.ajax_get_responden'
        ).as('get_responden')
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

      Route.group(() => {
        Route.get('', 'Profesi/ProfesiPengumummanController.get_pengumuman').as('pengumuman')
        Route.post('', 'Profesi/ProfesiPengumummanController.update_pengumuman').as(
          'ubah_pengumuman'
        )
        // file upload
        Route.post('upload-image', 'Profesi/ProfesiPengumummanController.upload_image').as(
          'upload_image'
        )
      }).prefix('pengumuman')

      // data
      Route.group(() => {
        Route.group(() => {
          Route.get('', 'Profesi/ProfesiAdminResponsController.pengisi').as('pengisi')
          Route.post('', 'Profesi/ProfesiAdminResponsController.update_data_pengisi').as(
            'update_data_pengisi'
          )
        })
          .prefix('pengisi')
          .middleware(['profesiEnum'])

        Route.group(() => {
          Route.get('', 'Profesi/ProfesiAdminResponsController.hasil').as('hasil')
          Route.post('', 'Profesi/ProfesiAdminResponsController.export_hasil_users').as(
            'export_hasil_users'
          )
        })
          .prefix('hasil')
          .middleware(['profesiKajur'])

        Route.group(() => {
          Route.get('', 'Profesi/ProfesiAdminResponsController.importuser').as('importuser')
          Route.post('', 'Profesi/ProfesiAdminResponsController.store_monitoring').as(
            'store_monitoring'
          )
        })
          .prefix('importuser')
          .middleware(['profesiAdmin', 'profesiStep3'])
      })
        .prefix('data')
        .as('data')

      // user managemen
      Route.group(() => {
        Route.group(() => {
          Route.get('', 'Profesi/ProfesiAdminUserManagemenController.edit_dataresponden').as(
            'dataresponden'
          )
          Route.post('', 'Profesi/ProfesiAdminUserManagemenController.edit_responden').as(
            'edit_responden'
          )
        })
          .prefix('edit/dataresponden')
          .as('edit')

        Route.group(() => {
          Route.get('', 'Profesi/ProfesiAdminUserManagemenController.view_tambah_responden').as(
            'dataresponden'
          )
          Route.post('', 'Profesi/ProfesiAdminUserManagemenController.insert_responden').as(
            'tambah_responden'
          )
        })
          .prefix('tambah/dataresponden')
          .as('tambah')
      })
        .prefix('managemen')
        .as('managemen')
        .middleware(['profesiEnum'])

      Route.group(() => {
        Route.group(() => {
          //sasaran
          Route.get('sasaran', 'Profesi/ProfesiAdminsController.sasaran').as('sasaran')
          Route.post('sasaran', 'Profesi/ProfesiAdminsController.set_sasaran').as('set_sasaran')
        }).middleware(['profesiStep12'])

        Route.group(() => {
          //jadwal
          Route.get('jadwal', 'Profesi/ProfesiAdminsController.jadwal').as('jadwal')
          Route.post('jadwal', 'Profesi/ProfesiAdminsController.set_jadwal').as('set_jadwal')
        }).middleware(['profesiStep4'])
      }).middleware(['profesiAdmin'])

      //ajax
      Route.get('ajax-prodi', 'Profesi/ProfesiAdminResponsController.ajax_prodi').as('get_prodi')
      Route.get('ajax-data-pengisi', 'Profesi/ProfesiAdminResponsController.ajax_data_pengisi').as(
        'get_data_pengisi'
      )
      Route.post('ajax-cek-populasi', 'Profesi/ProfesiAdminsController.cek_populasi').as(
        'cek_populasi'
      )
      Route.post('ajax-get-populasi', 'Profesi/ProfesiAdminsController.insert_populasi').as(
        'get_populasi'
      )
      Route.get('ajax-data-index', 'Profesi/ProfesiAdminsController.ajax_data_index').as(
        'get_data_index'
      )
      Route.get(
        'ajax-get-responden',
        'Profesi/ProfesiAdminUserManagemenController.ajax_get_responden'
      ).as('get_responden')
    })
      .prefix('profesi')
      .as('profesi')
      .middleware(['profesiAuth'])
  })
    .prefix('admin')
    .as('admin')
    .middleware(['user'])
}).prefix(Env.get('PREFIX'))

Route.get('*', ({ view }) => view.render('errors/not-found'))
