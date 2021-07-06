'use strict'
// Class definition

var KTCkeditor = (function () {
  // Private functions
  var demos = function () {
    ClassicEditor.create(document.querySelector('#pengumuman'))
      .then((editor) => {
        console.log(editor)
      })
      .catch((error) => {
        console.error(error)
      })
    ClassicEditor.create(document.querySelector('#laporan_online'))
      .then((editor) => {
        console.log(editor)
      })
      .catch((error) => {
        console.error(error)
      })
    ClassicEditor.create(document.querySelector('#tujuan'))
      .then((editor) => {
        console.log(editor)
      })
      .catch((error) => {
        console.error(error)
      })
    ClassicEditor.create(document.querySelector('#target_responden'))
      .then((editor) => {
        console.log(editor)
      })
      .catch((error) => {
        console.error(error)
      })
    ClassicEditor.create(document.querySelector('#jadwal'))
      .then((editor) => {
        console.log(editor)
      })
      .catch((error) => {
        console.error(error)
      })
    ClassicEditor.create(document.querySelector('#hubungi_kami'))
      .then((editor) => {
        console.log(editor)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return {
    // public functions
    init: function () {
      demos()
    },
  }
})()

// Initialization
jQuery(document).ready(function () {
  KTCkeditor.init()
})
