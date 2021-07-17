"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = global[Symbol.for('ioc.use')]("App/Global");
const ProfesiServices_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Profesi/ProfesiServices"));
const routeName = 'profesi.';
class ProfesiStep4 {
    async handle({ response, session }, next) {
        const tahunSasaran = await ProfesiServices_1.default.get_sasaran();
        if (!tahunSasaran) {
            Global_1.message(session, 'notification', 'danger', 'Tidak dapat masuk ke Halaman Ubah Jadwal dikarenakan belum mengubah sasaran dan mengimport user monitoring');
            return response.redirect().toRoute('admin.' + routeName + 'index');
        }
        if (tahunSasaran.status_import_monitoring === 0) {
            Global_1.message(session, 'notification', 'danger', 'Tidak dapat masuk ke Halaman Ubah Jadwal dikarenakan belum import user monitoring');
            return response.redirect().toRoute('admin.' + routeName + 'index');
        }
        return await next();
    }
}
exports.default = ProfesiStep4;
//# sourceMappingURL=ProfesiStep4.js.map