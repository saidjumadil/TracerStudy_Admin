"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = global[Symbol.for('ioc.use')]("App/Global");
const D3Services_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/D3/D3Services"));
const routeName = 'd3.';
class D3Step12 {
    async handle({ response, session }, next) {
        const tahunSasaran = await D3Services_1.default.get_sasaran();
        if (!tahunSasaran)
            return await next();
        if (!tahunSasaran.waktu_mulai) {
            Global_1.message(session, 'notification', 'danger', 'Tidak dapat mengubah Tahun Sasaran yang telah di set sebelumnya sampai Tracer selesai');
            return response.redirect().toRoute('admin.' + routeName + 'index');
        }
        if (Number(tahunSasaran.waktu_berakhir) < Date.now())
            return await next();
        if (tahunSasaran.tahun) {
            Global_1.message(session, 'notification', 'danger', 'Tidak dapat mengubah Tahun Sasaran yang telah di set sebelumnya sampai Tracer selesai');
            return response.redirect().toRoute('admin.' + routeName + 'index');
        }
        return await next();
    }
}
exports.default = D3Step12;
//# sourceMappingURL=D3Step12.js.map