/* eslint-disable prettier/prettier */

const drawData = (data, csrf, role) => {
  let datas = ''
  data.map((row, index) => {
    datas += `
    <tr>
      <form method="POST" data-id='${index}'>
        ${csrf}
        <input type='hidden' data-id='${index}' name='nim[]' value='${row.nim}'>
        <td>${index + 1}</td>
        <td>${row.nim}</td>
        <td>${row.nama}</td>
        <td data-id='${index}'  name='status'>
          <span class="dtr-data">
            <span class="label label-lg font-weight-bold label-light-success label-inline">Tersimpan</span>
          </span>
        </td>
        <td>${row.no_hape_1 || '-'}</td>
        <td> <label class="radio justify-content-center"> <input type="radio" ${
          role === '3' ? 'disabled' : ''
        } data-id='${index}' value='0' ${
      row.hp_valid_1 === 0 ? 'checked' : ''
    } name="hp_valid_1[${index}]"><span></span>
          </label> </td>
        <td> <label class="radio justify-content-center"> <input type="radio" ${
          role === '3' ? 'disabled' : ''
        } data-id='${index}' value='1' ${
      row.hp_valid_1 === 1 ? 'checked' : ''
    } name="hp_valid_1[${index}]"><span></span>
          </label> </td>
        <td>${row.no_hape_2 || '-'}</td>
        <td> <label class="radio justify-content-center"> <input type="radio" ${
          role === '3' ? 'disabled' : ''
        } data-id='${index}' value='0' ${
      row.hp_valid_2 === 0 ? 'checked' : ''
    } name="hp_valid_2[${index}]"><span></span>
          </label> </td>
        <td> <label class="radio justify-content-center"> <input type="radio" ${
          role === '3' ? 'disabled' : ''
        } data-id='${index}' value='1' ${
      row.hp_valid_1 === 1 ? 'checked' : ''
    } name="hp_valid_2[${index}]"><span></span>
          </label> </td>
        <td> <label class="checkbox"> <input type="checkbox" ${
          role === '3' ? 'disabled' : ''
        } data-id='${index}' value='${row.nim}' ${
      row.monitoring_1 ? 'checked' : ''
    } name="monitoring_1[]"> <span></span> </label> </td>
        <td> <label class="checkbox"> <input type="checkbox" ${
          role === '3' ? 'disabled' : ''
        } data-id='${index}' value='${row.nim}' ${
      row.monitoring_2 ? 'checked' : ''
    } name="monitoring_2[]"> <span></span> </label> </td>
        <td> <label class="checkbox"> <input type="checkbox" ${
          role === '3' ? 'disabled' : ''
        } data-id='${index}' value='${row.nim}' ${
      row.monitoring_3 ? 'checked' : ''
    } name="monitoring_3[]"> <span></span> </label> </td>
        <td>${getTimeFormat(row.tanggal_isi) || '-'}</td>
        <td>
          ${
            row.username
              ? '<div class="btn btn-success">Ya</div>'
              : '<div class="btn btn-danger">Tidak</div>'
          }
        </td>
      </form>
    </tr>
    `
  })

  return datas
}

const drawDatatable = (data, csrf, role = '4') => {
  return `
        <table class="table table-separate table-head-custom table-checkable w100" id="kt_datatable2">
          <thead>
            <tr>
              <th rowspan="2">No.</th>
              <th rowspan="2">NIM</th>
              <th rowspan="2">Nama</th>
              <th style="width:250px !important" rowspan="2">Status</th>
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
            ${drawData(data, csrf, role)}
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

const Status = (type, message) => {
  return `
    <span class="dtr-data">
      <span class="label label-lg font-weight-bold label-light-${type} label-inline">${message}</span>
    </span>
  `
}

const getTimeFormat = (value) => {
  if (!value) return '-'
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  }
  const days = {
    0: 'Minggu',
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: "Jum'at",
    6: 'Sabtu',
  }
  const waktu = new Date(value)
  const bulan = waktu.getMonth()
  const tahun = waktu.getFullYear()
  const hari = waktu.getDay()
  const date = waktu.getDate()
  const jam = waktu.getHours()
  const menit = waktu.getMinutes()
  return ` ${days[hari]}, ${String(date).padStart(2, '0')} ${
    months[bulan]
  } ${tahun}. Pukul ${String(jam).padStart(2, '0')}:${String(menit).padStart(2, '0')} WIB`
}

const Alert = (tipe, pesan) => {
  return `<div
    class="m-alert m-alert--outline alert alert-${tipe} alert-dismissible animated fadeIn"
    role="alert">
    <span>${pesan}</span>
    </div>`
}
