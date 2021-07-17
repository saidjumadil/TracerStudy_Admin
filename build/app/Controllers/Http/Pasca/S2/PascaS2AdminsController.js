"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PascaS2Services_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Pasca/S2/PascaS2Services"));
const ErrorLog_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ErrorLog"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const axios_1 = __importDefault(require("axios"));
const Global_1 = global[Symbol.for('ioc.use')]("App/Global");
const subfolder = `/${Env_1.default.get('PREFIX')}`;
const className = 'PascaS2AdminsController';
const renderName = 'pasca/s2';
const routeName = 'pasca.s2';
let alumni = Env_1.default.get('WS_ALUMNI_PASCA_S2');
class PascaS2AdminsController {
    async index({ view, auth }) {
        await auth.authenticate();
        const sasaran = await PascaS2Services_1.default.get_sasaran();
        const RouteActionDataIndex = `admin.${routeName}.get_data_index`;
        const tahunSasaran = await PascaS2Services_1.default.get_sasaran();
        return view.render(renderName + '/index', { sasaran, RouteActionDataIndex, tahunSasaran });
    }
    async ajax_data_index({ request, session, response }) {
        try {
            const { tahun, periode } = request.all();
            let get_list_kd_fjjp7 = await PascaS2Services_1.default.get_list_kdfjjp7();
            console.log(get_list_kd_fjjp7);
            let arr_kd_fjjp7 = [];
            for (let i = 0; i < get_list_kd_fjjp7.length; i++) {
                arr_kd_fjjp7.push(get_list_kd_fjjp7[i].kd_fjjp7);
            }
            const get_data = await PascaS2Services_1.default.get_data_index(tahun, periode, arr_kd_fjjp7);
            console.log('data: ' + JSON.stringify(get_data[0]));
            return { get_data };
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'cek_populasi', error.toString(), request.ip());
            Global_1.message(session, 'notification_sasaran', 'danger', 'Gagal mengambil data populasi sasaran Tracer Study');
            return response.redirect('back');
        }
    }
    async sasaran({ view, auth }) {
        await auth.authenticate();
        const get_sasaran = await PascaS2Services_1.default.get_sasaran();
        const cekPopulasiRoute = subfolder + '/admin/' + renderName + '/ajax-cek-populasi';
        const getPopulasiRoute = subfolder + '/admin/' + renderName + '/ajax-get-populasi';
        const ubahSasaranRoute = subfolder + '/admin/' + renderName + '/sasaran';
        const tahunSasaran = await PascaS2Services_1.default.get_sasaran();
        return view.render(renderName + '/sasaran', {
            get_sasaran,
            cekPopulasiRoute,
            getPopulasiRoute,
            ubahSasaranRoute,
            tahunSasaran,
        });
    }
    async cek_populasi({ request, session, response }) {
        try {
            let { tahun } = request.all();
            let get_populasi = await PascaS2Services_1.default.get_populasi(tahun);
            return { get_populasi };
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'cek_populasi', error.toString(), request.ip());
            Global_1.message(session, 'notification_sasaran', 'danger', 'Gagal mengambil data populasi sasaran Tracer Study');
            return response.redirect('back');
        }
    }
    async insert_populasi({ request, session, response }) {
        try {
            const { tahun } = request.all();
            response.safeHeader('Content-type', 'application/json');
            let total_inserted = 0;
            if (alumni) {
                let get_alumni = alumni.replace('yyyy', tahun);
                const data = await axios_1.default.get(get_alumni);
                const populasi = data.data[0];
                populasi.map((obj) => {
                    if (obj.hasOwnProperty('npm')) {
                        const val = obj.npm;
                        obj.nim = val;
                        delete obj.npm;
                    }
                    if (obj.hasOwnProperty('kode_prodi')) {
                        const val = obj.kode_prodi;
                        obj.kd_fjjp7 = val;
                        delete obj.kode_prodi;
                    }
                });
                const status = await PascaS2Services_1.default.insert_populasi(populasi);
                if (status) {
                    total_inserted += populasi.length;
                }
                else
                    return { isSuccess: false };
                return { isSuccess: true, total_inserted };
            }
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'insert_populasi', error.toString(), request.ip());
            Global_1.message(session, 'notification_sasaran', 'danger', 'Ada masalah dengan webservice!');
            return { isSuccess: false };
        }
    }
    async set_sasaran({ request, session }) {
        try {
            let { tahun, periode } = request.all();
            var tahun_periode = tahun.toString().concat(periode.toString());
            let current_sasaran = await PascaS2Services_1.default.get_sasaran();
            if (current_sasaran) {
                let num_current = Number(current_sasaran.tahun);
                let num_new_sasaran = Number(tahun_periode);
                let cek_sasaran = await PascaS2Services_1.default.cek_sasaran(tahun_periode);
                if (!cek_sasaran && num_new_sasaran > num_current) {
                    let status_import = 0;
                    const get_status_monitoring = await PascaS2Services_1.default.get_status_monitoring(tahun);
                    if (get_status_monitoring) {
                        status_import = 1;
                    }
                    let update = await PascaS2Services_1.default.set_sasaran(tahun_periode, status_import);
                    if (update) {
                        Global_1.message(session, 'notification_sasaran', 'success', 'Berhasil mengubah sasaran Tracer Study');
                        return { isSuccess: true, message: 'Berhasil mengubah sasaran Tracer Study' };
                    }
                }
                else {
                    Global_1.message(session, 'notification_sasaran', 'danger', 'Gagal mengubah karena sasaran sudah pernah dibuat!');
                    return { isSuccess: false };
                }
            }
            else {
                let status_import = 0;
                const get_status_monitoring = await PascaS2Services_1.default.get_status_monitoring(tahun);
                if (get_status_monitoring) {
                    status_import = 1;
                }
                let update = await PascaS2Services_1.default.set_sasaran(tahun_periode, status_import);
                if (update) {
                    Global_1.message(session, 'notification_sasaran', 'success', 'Berhasil mengubah sasaran Tracer Study');
                    return { isSuccess: true, message: 'Berhasil mengubah sasaran Tracer Study' };
                }
                else {
                    Global_1.message(session, 'notification_sasaran', 'danger', 'Gagal mengubah karena sasaran sudah pernah dibuat!');
                }
            }
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'set_sasaran', error.toString(), request.ip());
            Global_1.message(session, 'notification_sasaran', 'danger', 'Gagal mengubah sasaran Tracer Study');
            return { isSuccess: false };
        }
    }
    async jadwal({ view, auth }) {
        await auth.authenticate();
        const tahunSasaran = await PascaS2Services_1.default.get_sasaran();
        const get_jadwal = await PascaS2Services_1.default.get_jadwal();
        return view.render(renderName + '/jadwal', { get_jadwal, tahunSasaran });
    }
    async set_jadwal({ request, session, response, auth }) {
        await auth.authenticate();
        try {
            const { waktu_mulai, waktu_berakhir } = request.all();
            let begin = new Date(waktu_mulai);
            let end = new Date(waktu_berakhir);
            const update_jadwal = await PascaS2Services_1.default.set_jadwal(begin, end);
            if (update_jadwal) {
                Global_1.message(session, 'notification_jadwal', 'success', 'Berhasil mengubah jadwal Tracer Study');
                return response.redirect('back');
            }
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'set_jadwal', error.toString(), request.ip());
            Global_1.message(session, 'notification_jadwal', 'danger', 'Gagal mengubah jadwal Tracer Study');
            return response.redirect('back');
        }
    }
}
exports.default = PascaS2AdminsController;
//# sourceMappingURL=PascaS2AdminsController.js.map