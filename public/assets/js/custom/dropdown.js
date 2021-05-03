const dropdowns = document.querySelectorAll('select,input')

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener('change', (response) => {
    const id = response.target.getAttribute('data-key')
    const lainnya = document.querySelector(`input[name='lainnya[]'][data-id='${id}']`)

    if (lainnya)
      if (response.target.value == 10000) {
        lainnya.classList.remove('d-none')
      } else {
        lainnya.classList.add('d-none')
        lainnya.value = ''
      }
  })
})

let validationCheck = (el, isChecked) => {
  if (el.hasAttribute('not-empty') && isChecked) {
    el.setAttribute('data-fv-not-empty', el.getAttribute('not-empty'))
  } else if (el.hasAttribute('not-empty')) {
    el.setAttribute('data-fv-not-empty', false)
  }

  if (el.hasAttribute('numeric') && isChecked) {
    el.setAttribute('data-fv-numeric', el.getAttribute('numeric'))
  } else if (el.hasAttribute('numeric')) {
    el.setAttribute('data-fv-numeric', false)
  }

  if (el.hasAttribute('string-length') && isChecked) {
    el.setAttribute('data-fv-string-length', el.getAttribute('string-length'))
  } else if (el.hasAttribute('string-length')) {
    el.setAttribute('data-fv-string-length', false)
  }
}

let setValidasi = (childs, isChecked, id) => {
  if (HTMLCollection.prototype.isPrototypeOf(childs)) {
    for (child of childs) {
      if (child.classList.contains('table')) {
        const elements = document.querySelectorAll(
          `[data-target-dependency='${id}']>.table tr [type="radio"]:first-child`
        )

        elements.forEach((el) => validationCheck(el, isChecked))
      } else validationCheck(child, isChecked)
    }
  } else validationCheck(childs, isChecked)
}
const dependencies = document.querySelectorAll('[data-dependency-id]')

dependencies.forEach((dependency) => {
  dependency.addEventListener('change', (response) => {
    const nama_field = response.target.getAttribute('name')
    const id = response.target.getAttribute('data-dependency-id')

    let value = response.target.value
    if (nama_field == 'negara_domisili' || nama_field == 'negara_kantor') {
      if (value == '') value = '-1'
      else if (value != 1) value = '0'
    }

    const pertanyaans = document.querySelectorAll(`[data-target-dependency='${id}']`)

    pertanyaans.forEach((pertanyaan) => {
      let answer_value = pertanyaan.getAttribute('data-answer-dependency')

      let list_answer = answer_value.split(',')

      if (list_answer.includes(value)) {
        pertanyaan.classList.remove('d-none')
        setValidasi(pertanyaan.children, true, id)
      } else {
        pertanyaan.classList.add('d-none')
        setValidasi(pertanyaan.children, false, id)
        pertanyaan.value = ''
      }

      const select_input_pertanyaans = document.querySelectorAll(`
      [data-target-dependency='${id}'][data-answer-dependency='${answer_value}'] select,
      [data-target-dependency='${id}'][data-answer-dependency='${answer_value}'] input:first-child
      `)

      select_input_pertanyaans.forEach((row) => {
        console.log(row)
        if (list_answer.includes(value)) {
          setValidasi(row, true, id)
        } else {
          setValidasi(row, false, id)
          row.checked = false
          row.selected = false
        }
      })
    })

    LoadValidation()
  })
})
