"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProfesiServices_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Profesi/ProfesiServices"));
const ErrorLog_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ErrorLog"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const Global_1 = global[Symbol.for('ioc.use')]("App/Global");
const className = 'ProfesiAdminUserManagemenController';
const renderName = 'profesi';
class ProfesiAdminUserManagemenController {
    async view_tambah_responden({ view }) {
        const tahunSasaran = await ProfesiServices_1.default.get_sasaran();
        return view.render(renderName + '/managemen/tambah_akunresponden', { tahunSasaran });
    }
    async insert_responden({ request, response, session }) {
        try {
            const { nim } = request.all();
            let cek_nim = await ProfesiServices_1.default.get_validasi_nim(nim);
            if (cek_nim) {
                const hash_password = await Hash_1.default.make(nim);
                const password_clear = nim;
                await ProfesiServices_1.default.create_responden(nim, cek_nim.nama_mhs, cek_nim.periode, password_clear, hash_password);
                Global_1.message(session, 'notification', 'success', 'Berhasil menambah akun responden, password adalah NPM');
                return response.redirect('back');
            }
            else {
                Global_1.message(session, 'notification', 'danger', 'NPM tidak valid');
                return response.redirect('back');
            }
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'insert_responden', error.toString(), request.ip());
            Global_1.message(session, 'notification', 'danger', 'Gagal menambah akun responden');
            return response.redirect('back');
        }
    }
    async ajax_get_responden({ request }) {
        try {
            const { nim } = request.all();
            const responden = await ProfesiServices_1.default.get_responden(nim);
            return { responden };
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'get_responden', error.toString(), request.ip());
            return { responden: [] };
        }
    }
    async edit_responden({ request, response, session }) {
        try {
            const { nim, email } = request.all();
            console.log(nim);
            console.log(email);
            const edit = await ProfesiServices_1.default.edit_responden(nim, email);
            if (edit) {
                Global_1.message(session, 'notification', 'success', 'Berhasil mengubah email');
                return response.redirect('back');
            }
            Global_1.message(session, 'notification', 'danger', 'Gagal mengubah email');
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'edit_responden', error.toString(), request.ip());
            Global_1.message(session, 'notification', 'danger', 'Gagal mengubah email');
            return response.redirect('back');
        }
    }
    async edit_dataresponden({ view, auth }) {
        await auth.authenticate();
        const tahunSasaran = await ProfesiServices_1.default.get_sasaran();
        const RouteActionSearch = `admin.${renderName}.get_responden`;
        return view.render(renderName + '/managemen/edit_akunresponden', {
            RouteActionSearch,
            tahunSasaran,
        });
    }
}
exports.default = ProfesiAdminUserManagemenController;
//# sourceMappingURL=ProfesiAdminUserManagemenController.js.map