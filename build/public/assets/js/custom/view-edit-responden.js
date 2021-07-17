const drawFormResponden = (data) => {
  // console.log(data)
  return `
      <input type="hidden" name='nim' class="form-control" value="${data.nim}">
      <table class='table table-hover'>
        <tr class='h-50px' style='line-height:50px'>
          <td>${data.nama_lengkap}</td>
          <td>${data.nim}</td>
          <td>
              <input type="text"  name='email' class="form-control h-50px" value="${data.email}">
          </td>
          <td>
            <button type='submit' class="btn btn-warning">Edit Email</button>
          </td>
        </tr>
      </table>
  `
}

const drawLoading = () => {
  return `
      <div class="row justify-content-center">
        <div class="spinner spinner-primary spinner-lg"></div>
      </div>
    `
}

const Alert = (tipe, pesan) => {
  return `<div
    class="m-alert m-alert--outline alert alert-${tipe} alert-dismissible animated fadeIn"
    role="alert">
    <span>${pesan}</span>
    </div>`
}
