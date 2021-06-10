'use strict'
// Class definition
// console.log(RouteAction)
const csrfToken = document.querySelector('[name="_csrf"]').value
var KTDropzoneDemo = (function () {
  // Private functions
  var demo1 = function () {
    // file type validation
    $('#kt_dropzone_3').dropzone({
      url: RouteAction, // Set the url for your upload script location
      paramName: 'banner', // The name that will be used to transfer the file
      maxFiles: 1,
      method: 'POST',
      maxFilesize: 2, // MB
      addRemoveLinks: true,
      acceptedFiles: '.jpg',
      headers: {
        'X-CSRF-TOKEN': csrfToken,
      },
      accept: function (file, done) {
        console.log(file)
        done()
      },
    })
  }

  return {
    // public functions
    init: function () {
      demo1()
    },
  }
})()

KTUtil.ready(function () {
  KTDropzoneDemo.init()
})
