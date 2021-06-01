import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'

View.global('appUrl', (path) => {
  const APP_URL = Env.get('APP_URL')

  return path ? `${APP_URL}/${path}` : APP_URL
})

View.global('webService', (path) => {
  const WEB = Env.get('WEB_SERVICE')

  return path ? `${WEB}/${path}` : WEB
})

View.global('bulans', {
  0: 'Januari',
  1: 'Februari',
  2: 'Maret',
  3: 'April',
  4: 'Mei',
  5: 'Juni',
  6: 'Juli',
  7: 'Agustus',
  8: 'Sebtember',
  9: 'Oktober',
  10: 'November',
  11: 'Desember',
})

// mengambil data ascii buat increment 11a,11b dst...
// FIXME: getAscii() tidak diketahui di edge
View.global('getAscii', (value) => {
  const ascii = {
    97: 'a',
    98: 'b',
    99: 'c',
    100: 'd',
    101: 'e',
    102: 'f',
    103: 'g',
    104: 'h',
    105: 'i',
    106: 'j',
    107: 'k',
    108: 'l',
    109: 'm',
    110: 'n',
    111: 'o',
    112: 'p',
    113: 'q',
    114: 'r',
    115: 's',
    116: 't',
    117: 'u',
    118: 'v',
    119: 'w',
    120: 'x',
    121: 'y',
    122: 'z',
  }

  return ascii[value]
})
View.global('haris', {
  0: 'Minggu',
  1: 'Senin',
  2: 'Selasa',
  3: 'Rabu',
  4: 'Kamis',
  5: "Jum'at",
  6: 'Sabtu',
})

View.global('getBulan', function (date) {
  const bulan = this.resolve('bulans')
  return bulan[new Date(date).getMonth()]
})

View.global('getHari', function (date) {
  const hari = this.resolve('haris')
  return hari[new Date(date).getDay()]
})

View.global('convertTanggal', function (date) {
  const bulan = this.resolve('getBulan')
  const tanggal = new Date(date)
  return tanggal.getDate() + ' ' + bulan(date) + ' ' + tanggal.getFullYear()
})

View.global('convertTanggalYYYYMMDDWithHyphen', function (date) {
  // const bulan = this.resolve('getBulan')
  const tanggal = new Date(date)
  var month = tanggal.getMonth() + 1
  // const tanggal = new Date(date)
  return tanggal.getFullYear() + '-' + month + '-' + tanggal.getDate()
})

View.global('convertTanggalDDMMYYYWithSlash', function (date) {
  // const bulan = this.resolve('getBulan')
  const tanggal = new Date(date)
  let bulan = tanggal.getMonth()
  bulan = bulan + 1
  // const tanggal = new Date(date)
  // return tanggal.getFullYear()+'-'+tanggal.getMonth()+'-'+tanggal.getDate()
  return tanggal.getDate() + '/' + bulan + '/' + tanggal.getFullYear()
})

View.global('cleanString', function (string) {
  const cleanString = string.replace(/[|&;$%@"<>()+,_-]/g, ' ')
  return cleanString
})

View.global('ucFirst', function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
})

View.global('range', function (start: number, end: number) {
  const arr: Array<number> = []
  if (start > end) for (let i = start; i > end; i--) arr.push(i)
  else for (let i = start; i < end; i++) arr.push(i)

  return arr
})

View.global('conString', function (value1: string, value2: string) {
  return value1 + value2
})

View.global('getTitleSasaran', function (sasaran: string) {
  let tahun = sasaran.toString().substring(0, 4)
  let periode = sasaran.toString().substring(4, 5)

  if (periode === '0') return tahun
  return tahun + ' Periode ' + periode
})

View.global('getTimeFormat', function (value: string) {
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
  console.log(value)
  const waktu = new Date(value)
  const bulan = waktu.getMonth()
  const tahun = waktu.getFullYear()
  const hari = waktu.getDate()
  const jam = waktu.getHours()
  const menit = waktu.getMinutes()
  return `Jam ${jam}.${menit}, ${hari} ${months[bulan]} ${tahun}`
})
