/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import xlsx from 'xlsx'

export default class ExportToExcelController {
  public static exportExcel(data, workSheetColumnNames, workSheetName, filePath) {
    try {
      console.log('aass' + data, workSheetColumnNames, workSheetName, filePath)
      const workBook = xlsx.utils.book_new()
      /**
       * format worksheetdata
       *
       * [
       *  [
       *    header...
       *  ],
       *  [
       *    data1...
       *  ],
       *  [
       *    data2...
       *  ],
       *  ...
       * ]
       */
      const workSheetData = [workSheetColumnNames, ...data.map((row) => [...Object.values(row)])] //mengatur sheetname dan data
      const workSheet = xlsx.utils.aoa_to_sheet(workSheetData) //
      console.log(workSheet)
      xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName)
      xlsx.writeFile(workBook, filePath)
    } catch (error) {
      console.log(error)
    }
  }

  public static exportUsersToExcel(datas, workSheetColumnNames, workSheetName, filePath) {
    const data = datas.map((data) => {
      console.log('ini data' + data.id)
      return [data.id]
    })
    this.exportExcel(data, workSheetColumnNames, workSheetName, filePath)
  }
}
