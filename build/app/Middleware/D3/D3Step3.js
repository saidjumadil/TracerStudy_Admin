"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = global[Symbol.for('ioc.use')]("App/Global");
const D3Services_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/D3/D3Services"));
const routeName = 'd3.';
class D3Step3 {
    async handle({ response, session }, next) {
        const tahunSasaran = await D3Services_1.default.get_sasaran();
        if (!tahunSasaran) {
            Global_1.message(session, 'notification', 'danger', 'Tidak dapat masuk ke Halaman Import User Monitoring dikarenakan belum mengubah Tahun Sasaran');
            return response.redirect().toRoute('admin.' + routeName + 'index');
        }
        if (tahunSasaran.status_import_monitoring === 1) {
            Global_1.message(session, 'notification', 'danger', 'Import User Monitoring sudah dilakukan. anda tidak dapat mengaksesnya lagi');
            return response.redirect().toRoute('admin.' + routeName + 'index');
        }
        return await next();
    }
}
exports.default = D3Step3;
//# sourceMappingURL=D3Step3.js.map