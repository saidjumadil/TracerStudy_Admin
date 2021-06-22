/* eslint-disable @typescript-eslint/naming-convention */
// Class definition
var KTFormControls = (function () {
  // Private functions
  var _initDemo1 = function () {
    FormValidation.formValidation(document.getElementById('form'), {
      fields: {
        username: {
          validators: {
            notEmpty: {
              message: 'Masukkan Username anda',
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
  var _initDemo3 = function () {
    FormValidation.formValidation(document.getElementById('form_lupapassword'), {
      fields: {
        nim_lupapassword: {
          validators: {
            notEmpty: {
              message: 'Masukkan NIM anda',
            },
            digits: {
              message: 'NIM berupa angka',
            },
          },
        },
        email_lupapassword: {
          validators: {
            notEmpty: {
              message: 'Masukkan email anda',
            },
            emailAddress: {
              message: 'Email address tidak valid',
            },
          },
        },
        username_lupapassword: {
          validators: {
            notEmpty: {
              message: 'Masukkan username anda',
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
      if (document.getElementById('form')) _initDemo1()
      if (document.getElementById('form_daftar')) _initDemo2()
      if (document.getElementById('form_lupapassword')) _initDemo3()
    },
  }
})()

jQuery(document).ready(function () {
  KTFormControls.init()
})
