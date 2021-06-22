/* eslint-disable prettier/prettier */
import xlsx from 'xlsx'

export const exportExcel = (datas, workSheetName, filePath) => {
  try {
    const workBook = xlsx.utils.book_new()
    for (let index = 0; index < datas.length; index++) {
      const data = datas[index]
      const workSheetColumnName: any = [...Object.keys(data[0])]
      const workSheetData = [workSheetColumnName, ...data.map((row) => [...Object.values(row)])] //mengatur sheetname dan data
      const workSheet = xlsx.utils.aoa_to_sheet(workSheetData) //
      xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName[index])
    }
    xlsx.writeFile(workBook, filePath)
  } catch (error) {
    console.log(error)
  }
}
