export const formatFileExcel = (tahun: string, periode: string, jenjang: string, prodi: string) => {
  return `/hasil_ts_${tahun}_${
    periode === '0' ? 'SemuaPeriode' : 'Periode' + periode
  }_${prodi.replace(' ', '_')}_(${jenjang.toUpperCase()}).xlsx`
}
