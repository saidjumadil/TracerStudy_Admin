const start = document.querySelector('#kt_datetimepicker_7_1 input')
const end = document.querySelector('#kt_datetimepicker_7_2 input')
// Class definition

var KTBootstrapDatetimepicker = (function () {
  // Private functions
  var baseDemos = function () {
    // Demo 7
    $('#kt_datetimepicker_7_1').datetimepicker({
      // locale: 'id',
    })
    $('#kt_datetimepicker_7_2').datetimepicker({
      useCurrent: false,
      // locale: 'id',
    })

    $('#kt_datetimepicker_7_1').on('change.datetimepicker', function (e) {
      $('#kt_datetimepicker_7_2').datetimepicker('minDate', e.date)
      start.dispatchEvent(new Event('input', { bubbles: true }))
    })
    $('#kt_datetimepicker_7_2').on('change.datetimepicker', function (e) {
      $('#kt_datetimepicker_7_1').datetimepicker('maxDate', e.date)
      end.dispatchEvent(new Event('input', { bubbles: true }))
    })
  }
  return {
    // Public functions
    init: function () {
      baseDemos()
    },
  }
})()

jQuery(document).ready(function () {
  KTBootstrapDatetimepicker.init()
})
