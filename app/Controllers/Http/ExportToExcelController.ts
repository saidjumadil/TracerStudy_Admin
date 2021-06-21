/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import xlsx from 'xlsx'
import path from 'path'

export default class ExportToExcelController {
  public static exportExcel(data, workSheetColumnNames, workSheetName, filePath) {
    try {
      console.log('aass' + data, workSheetColumnNames, workSheetName, filePath)
      const workBook = xlsx.utils.book_new()
      const workSheetData = [workSheetColumnNames, data] //mengatur sheetname dan data
      const workSheet = xlsx.utils.aoa_to_sheet(workSheetData) //
      xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName)
      xlsx.writeFile(workBook, path.resolve(filePath))
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
