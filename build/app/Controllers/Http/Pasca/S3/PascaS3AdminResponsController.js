"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PascaS3Services_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Pasca/S3/PascaS3Services"));
const ErrorLog_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ErrorLog"));
const Global_1 = global[Symbol.for('ioc.use')]("App/Global");
const renderName = 'pasca/s3';
const excelName = 'pasca_s3';
const className = 'PascaS3AdminResponsController';
const table_name = [
    'jawaban_pendahuluan',
    'jawaban_kuliah',
    'jawaban_bekerja',
    'jawaban_study',
    'jawaban_wirausaha',
];
const workSheetName = [
    'Pertanyaan Pendahuluan',
    'Pengalaman Perkuliahan',
    'Bekerja',
    'Lanjut Studi',
    'Wirausaha',
];
const routeName = 'pasca.s3';
class PascaS3AdminResponsController {
    async pengisi({ view, auth }) {
        await auth.authenticate();
        const tahunSasaran = await PascaS3Services_1.default.get_sasaran();
        let daftar_sasaran = await PascaS3Services_1.default.get_list_sasaran();
        if ([3, 4].includes(auth.user.legacy_role)) {
            daftar_sasaran = daftar_sasaran.filter((row) => row.tahun.substring(0, 4) === tahunSasaran.tahun.substring(0, 4));
        }
        const GetFakultas = await PascaS3Services_1.default.get_fakultas();
        const RouteActionProdi = `admin.${routeName}.get_prodi`;
        const RouteActionDataPengisi = `admin.${routeName}.get_data_pengisi`;
        const RouteActionUpdateDataPengisi = `admin.${routeName}.data.update_data_pengisi`;
        return view.render(renderName + '/data/pengisi', {
            tahunSasaran,
            GetFakultas,
            RouteActionProdi,
            RouteActionDataPengisi,
            RouteActionUpdateDataPengisi,
            daftar_sasaran,
        });
    }
    async ajax_data_pengisi({ request }) {
        try {
            let { tahun, periode, kd_fjjp7 } = request.all();
            let periode_wisuda = 'null';
            if (tahun && periode)
                periode_wisuda = tahun.concat(periode);
            let kd_fjjp7_mapping = await PascaS3Services_1.default.get_users_mapping_kd_fjjp7(kd_fjjp7);
            if (kd_fjjp7_mapping.length === 0) {
                return { message: 'Data User Mapping (kode fjjp7 ' + kd_fjjp7 + ') tidak tersedia ' };
            }
            if (periode_wisuda !== 'null') {
                console.log(periode_wisuda);
                const get_data_pengisi = await PascaS3Services_1.default.get_data_pengisi(periode_wisuda, kd_fjjp7_mapping);
                return { get_data_pengisi };
            }
            else {
                const get_periode_wisuda = await PascaS3Services_1.default.get_sasaran();
                const get_data_pengisi = await PascaS3Services_1.default.get_data_pengisi(get_periode_wisuda.tahun, kd_fjjp7_mapping);
                return { get_data_pengisi };
            }
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'get_data_pengisi', error.toString(), request.ip());
            return { get_data_pengisi: [] };
        }
    }
    async update_data_pengisi({ request, session }) {
        try {
            let { nim, hp_valid_1, hp_valid_2, monitoring_1, monitoring_2, monitoring_3 } = request.all();
            let current_timestamp = Date.now();
            monitoring_1 = monitoring_1 ? current_timestamp : '';
            monitoring_2 = monitoring_2 ? current_timestamp : '';
            monitoring_3 = monitoring_3 ? current_timestamp : '';
            const update_data_pengisi = await PascaS3Services_1.default.update_data_pengisi(nim, hp_valid_1, hp_valid_2, monitoring_1, monitoring_2, monitoring_3);
            if (update_data_pengisi) {
                return {
                    isSuccess: true,
                    notification: { type: 'success', message: 'Berhasil memperbarui data' },
                };
            }
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'update_data_pengisi', error.toString(), request.ip());
            Global_1.message(session, 'notification', 'danger', 'Gagal memperbarui data');
            return {
                isSuccess: false,
                notification: { type: 'danger', message: 'Gagal memperbarui data' },
            };
        }
    }
    async hasil({ view, auth }) {
        await auth.authenticate();
        const tahunSasaran = await PascaS3Services_1.default.get_sasaran();
        const GetFakultas = await PascaS3Services_1.default.get_fakultas();
        const RouteActionProdi = `admin.${routeName}.get_prodi`;
        return view.render(renderName + '/data/hasil', { GetFakultas, RouteActionProdi, tahunSasaran });
    }
    async export_hasil_users({ request }) {
        try {
            let { tahun, periode, kd_fjjp7_prodi } = request.all();
            let periode_wisuda = tahun.concat(periode);
            const [kd_fjjp7, prodi] = kd_fjjp7_prodi.split(':');
            let kd_fjjp7_non = await PascaS3Services_1.default.get_users_mapping_kd_fjjp7(kd_fjjp7);
            let datas = [];
            for (let index = 0; index < table_name.length; index++) {
                const get_jawabans = await PascaS3Services_1.default.get_jawaban_users(periode_wisuda, kd_fjjp7_non, table_name[index]);
                datas.push(get_jawabans);
            }
            if (!datas[0][0]) {
                return {
                    isSuccess: false,
                    message: { type: 'warning', message: 'data export tidak tersedia' },
                };
            }
            const filePath = Global_1.formatFileExcel(tahun, periode, excelName, prodi);
            const workBook = Global_1.exportExcel(datas, workSheetName);
            return {
                isSuccess: true,
                workBook,
                filePath,
                message: { type: 'success', message: 'Berhasil export data' },
            };
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'export_hasil', error.toString(), request.ip());
            return {
                isSuccess: false,
                message: { type: 'danger', message: 'Gagal export data hasil kuesioner TS' },
            };
        }
    }
    async importuser({ view, auth }) {
        await auth.authenticate();
        const sasaran = await PascaS3Services_1.default.get_sasaran();
        const tahunSasaran = await PascaS3Services_1.default.get_sasaran();
        return view.render(renderName + '/data/import_user', { sasaran, tahunSasaran });
    }
    async store_monitoring({ request, response, session }) {
        try {
            const tahun = await PascaS3Services_1.default.get_sasaran();
            let tahun_monitoring = tahun.tahun.substring(0, 4);
            const get_import_status = await PascaS3Services_1.default.get_status_monitoring(tahun_monitoring);
            if (get_import_status) {
                Global_1.message(session, 'notification', 'warning', 'Data monitoring sudah pernah diimport!');
                return response.redirect('back');
            }
            const store_monitoring = await PascaS3Services_1.default.import_monitoring(tahun_monitoring);
            if (store_monitoring) {
                await PascaS3Services_1.default.update_status_monitoring();
                Global_1.message(session, 'notification', 'success', 'Berhasil import data monitoring');
                return response.redirect().toRoute('admin.' + routeName + '.index');
            }
            Global_1.message(session, 'notification', 'danger', 'Gagal import data monitoring');
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'store_monitoring', error.toString(), request.ip());
            Global_1.message(session, 'notification', 'danger', 'Gagal import data monitoring');
            return response.redirect('back');
        }
    }
    async ajax_prodi({ request }) {
        try {
            const { id_fakultas } = request.all();
            const GetProdi = await PascaS3Services_1.default.get_prodi(id_fakultas);
            return { GetProdi };
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = PascaS3AdminResponsController;
//# sourceMappingURL=PascaS3AdminResponsController.js.map