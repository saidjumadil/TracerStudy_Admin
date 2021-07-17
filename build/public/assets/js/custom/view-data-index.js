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
      row.monitoring_1 ? 'checked' : ''
    } name="monitoring_1[]"> <span></span> </label> </td>
      <td> <label class="checkbox"> <input type="checkbox" value='${row.nim}' ${
      row.monitoring_2 ? 'checked' : ''
    } name="monitoring_2[]"> <span></span> </label> </td>
      <td> <label class="checkbox"> <input type="checkbox" value='${row.nim}' ${
      row.monitoring_3 ? 'checked' : ''
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
  let tempFakultas = ''
  let head = 0
  let total = 0
  let sumFak = 0
  let sumDoneFak = 0
  let sumAll = 0
  let sumDoneAll = 0
  let textHtml = `
    <table class="table table-bordered table-hover">
  `
  data.forEach((row) => {
    // if (tempFakultas === row.nama_fakultas)
    if (total === 1 && tempFakultas !== row.nama_fakultas) {
      textHtml += `
        <tr style="font-weight:bold;">
          <td><b>TOTAL</b></td>
          <td>${sumFak}</td>
          <td>${sumAll}</td>
        </tr>
        <tr>
          <td colspan="3" class='bg-gray-400'></td>
        </tr>
      `
      sumFak = 0
      sumAll = 0
      total = 0
    }

    if (tempFakultas !== row.nama_fakultas) {
      tempFakultas = row.nama_fakultas
      head = 1
      total = 1
    }

    if (head === 1) {
      textHtml += `
        <tr>
          <td colspan="3" class="center bg-primary text-white" style="font-size:20px;"><b>${row.nama_fakultas}</b></td>
        </tr>
        <tr style="font-weight:bold; font-size:14px;" class='bg-gray-400'>
          <td style="width:30%">Prodi</td>
          <td>Jumlah Pendaftar</td>
          <td>Mengisi Lengkap</td>
        </tr>
      `
      head = 0
    }

    textHtml += `
        <tr>
          <td>${row.nama_prodi}</td>
          <td>${row.jumlah_pendaftar}</td>
          <td>${row.selesai}</td>
        </tr>
      `
    sumFak += row.jumlah_pendaftar
    sumDoneFak += row.jumlah_pendaftar
    sumAll += row.selesai
    sumDoneAll += row.selesai
  })

  if (total === 1) {
    textHtml += `
    <tr style="font-weight:bold;">
      <td><b>TOTAL</b></td>
      <td>${sumFak}</td>
      <td>${sumAll}</td>
    </tr>
    `
    sumFak = 0
    sumAll = 0
  }
  textHtml += `
    <tr rowspan="2">
      <td colspan="3" class='bg-gray-400'></td>
    </tr>
    <tr style="font-weight:bold;" class='bg-primary text-white'>
      <td><h5><b>GRAND TOTAL</b></h5></td>
      <td>${sumDoneFak}</td>
      <td>${sumDoneAll}</td>
    </tr>
  `
  textHtml += `
    </table>
  `
  // console.log(data)
  return textHtml
}

const drawLoading = () => {
  return `
      <div class="row justify-content-center">
        <div class="spinner spinner-primary spinner-lg"></div>
      </div>
    `
}
const drawNoResult = () => {
  return `
      <table class="table table-bordered table-hover">
        <tr rowspan="2">
          <td colspan="3" class='bg-info text-white'>Belum ada pengguna yang mendaftar</td>
        </tr>
      </table>
    `
}
const drawInvalidInput = () => {
  return `
      <table class="table table-bordered table-hover">
        <tr rowspan="2">
          <td colspan="3" class='bg-danger text-white'>Tolong pilih tahun dan periode terlebih dahulu</td>
        </tr>
      </table>
    `
}

const Alert = (tipe, pesan) => {
  return `<div
    class="m-alert m-alert--outline alert alert-${tipe} alert-dismissible animated fadeIn"
    role="alert">
    <span>${pesan}</span>
    </div>`
}
