// Class definition

var KTBootstrapDatetimepicker = (function () {
  // Private functions
  var baseDemos = function () {
    // Demo 1
    $('#kt_datetimepicker_1').datetimepicker()
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
