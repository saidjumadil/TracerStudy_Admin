// Class definition
var KTFormControls = (function () {
  // Private functions
  var _initDemo1 = function () {
    FormValidation.formValidation(document.getElementById('form'), {
      fields: {
        nim: {
          validators: {
            notEmpty: {
              message: 'Masukkan NIM anda',
            },
            digits: {
              message: 'NIM berupa angka',
            },
          },
        },

        password: {
          validators: {
            notEmpty: {
              message: 'Masukkan password anda',
            },
          },
        },
      },

      plugins: {
        //Learn more: https://formvalidation.io/guide/plugins
        trigger: new FormValidation.plugins.Trigger(),
        // Bootstrap Framework Integration
        bootstrap: new FormValidation.plugins.Bootstrap(),
        // Validate fields when clicking the Submit button
        submitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    })
  }

  var _initDemo2 = function () {
    FormValidation.formValidation(document.getElementById('form_daftar'), {
      fields: {
        nim_daftar: {
          validators: {
            notEmpty: {
              message: 'Masukkan NIM anda',
            },
            digits: {
              message: 'NIM berupa angka',
            },
          },
        },
        email_daftar: {
          validators: {
            notEmpty: {
              message: 'Masukkan email anda',
            },
            emailAddress: {
              message: 'Email address tidak valid',
            },
          },
        },
        email1_daftar: {
          validators: {
            notEmpty: {
              message: 'Masukkan email konfirmasi anda',
            },
            emailAddress: {
              message: 'Email address tidak valid',
            },
          },
        },

        password: {
          validators: {
            notEmpty: {
              message: 'Masukkan password anda',
            },
          },
        },
      },

      plugins: {
        //Learn more: https://formvalidation.io/guide/plugins
        trigger: new FormValidation.plugins.Trigger(),
        // Bootstrap Framework Integration
        bootstrap: new FormValidation.plugins.Bootstrap(),
        // Validate fields when clicking the Submit button
        submitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    })
  }
  return {
    // public functions
    init: function () {
      _initDemo1()
      _initDemo2()
    },
  }
})()

jQuery(document).ready(function () {
  KTFormControls.init()
})
