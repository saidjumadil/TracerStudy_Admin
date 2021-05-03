let fv

document.addEventListener('DOMContentLoaded', function (e) {
  LoadValidation()
})

let LoadValidation = () => {
  if (fv) fv.destroy()

  fv = FormValidation.formValidation(document.getElementById('kuisoner'), {
    // You don't need to declare the field validator here anymore
    plugins: {
      //Learn more: https://formvalidation.io/guide/plugins
      trigger: new FormValidation.plugins.Trigger(),
      // Bootstrap Framework Integration
      bootstrap: new FormValidation.plugins.Bootstrap(),
      // Validate fields when clicking the Submit button
      submitButton: new FormValidation.plugins.SubmitButton(),
      // Submit the form when all fields are valid
      defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      declarative: new FormValidation.plugins.Declarative({
        html5Input: true,
      }),
    },
  })
}
