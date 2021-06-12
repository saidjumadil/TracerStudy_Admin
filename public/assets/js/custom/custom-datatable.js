const drawData = (data) => {
  let datas = ''
  data.map((row, index) => {
    datas += `
    <tr>
      <input type='hidden' name='nim' value='${row.nim}'>
      <td>${index + 1}</td>
      <td>${row.nim}</td>
      <td>${row.nama}</td>
      <td>${row.no_hape_1}</td>
      <td> <label class="radio justify-content-center"> <input type="radio" value='0' ${
        row.hp_valid_1 === 0 ? 'checked' : ''
      } name="hp_valid_1[${index}]"><span></span>
        </label> </td>
      <td> <label class="radio justify-content-center"> <input type="radio" value='1' ${
        row.hp_valid_1 === 1 ? 'checked' : ''
      } name="hp_valid_1[${index}]"><span></span>
        </label> </td>
      <td>${row.no_hape_2}</td>
      <td> <label class="radio justify-content-center"> <input type="radio" value='0' ${
        row.hp_valid_2 === 0 ? 'checked' : ''
      } name="hp_valid_2[${index}]"><span></span>
        </label> </td>
      <td> <label class="radio justify-content-center"> <input type="radio" value='1' ${
        row.hp_valid_1 === 1 ? 'checked' : ''
      } name="hp_valid_2[${index}]"><span></span>
        </label> </td>
      <td> <label class="checkbox"> <input type="checkbox" value='${row.nim}' ${
      row.monitoring_1 === 1 ? 'checked' : ''
    } name="monitoring_1[]"> <span></span> </label> </td>
      <td> <label class="checkbox"> <input type="checkbox" value='${row.nim}' ${
      row.monitoring_2 === 1 ? 'checked' : ''
    } name="monitoring_2[]"> <span></span> </label> </td>
      <td> <label class="checkbox"> <input type="checkbox" value='${row.nim}' ${
      row.monitoring_3 === 1 ? 'checked' : ''
    } name="monitoring_3[]"> <span></span> </label> </td>
      <td>${row.tanggal_isi}</td>
      <td>
        ${
          row.username
            ? '<div class="btn btn-success">Ya</div>'
            : '<div class="btn btn-danger">Tidak</div>'
        }
      </td>
    </tr>
    `
  })

  return datas
}

const drawDatatable = (data) => {
  return `
        <table class="table table-separate table-head-custom table-checkable w100" id="kt_datatable2">
          <thead>
            <tr>
              <th rowspan="2">No.</th>
              <th rowspan="2">NIM</th>
              <th rowspan="2">Nama</th>
              <th rowspan="2">Hape1</th>
              <th colspan="2">Hape1 Valid</th>
              <th rowspan="2">Hape2</th>
              <th colspan="2">Hape2 Valid</th>
              <th colspan="3">Monitoring</th>
              <th rowspan="2">Tanggal Isi</th>
              <th rowspan="2">Mendaftar</th>
            </tr>
            <tr>
              <th>Tidak</th>
              <th>Ya</th>
              <th>Tidak</th>
              <th>Ya</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
            </tr>
          </thead>
          <tbody >
            ${drawData(data)}
          </tbody>
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
