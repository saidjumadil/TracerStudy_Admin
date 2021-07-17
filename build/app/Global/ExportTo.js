"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportExcel = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
const exportExcel = (datas, workSheetName) => {
    try {
        const workBook = xlsx_1.default.utils.book_new();
        for (let index = 0; index < datas.length; index++) {
            const data = datas[index];
            const headers = data[0]
                ? Object.keys(data[0])
                : ['Belum ada satupun pengguna yang menjawab pertanyaan bagian ini'];
            const workSheetColumnName = [...headers];
            const workSheetData = [workSheetColumnName, ...data.map((row) => [...Object.values(row)])];
            const workSheet = xlsx_1.default.utils.aoa_to_sheet(workSheetData);
            xlsx_1.default.utils.book_append_sheet(workBook, workSheet, workSheetName[index]);
        }
        return workBook;
    }
    catch (error) {
        console.log(error);
    }
};
exports.exportExcel = exportExcel;
//# sourceMappingURL=ExportTo.js.map