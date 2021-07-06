"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = global[Symbol.for('ioc.use')]("App/Global");
const ProfesiServices_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Profesi/ProfesiServices"));
const routeName = 'profesi.';
class ProfesiStep3 {
    async handle({ response, session }, next) {
        const tahunSasaran = await ProfesiServices_1.default.get_sasaran();
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
exports.default = ProfesiStep3;
//# sourceMappingURL=ProfesiStep3.js.map