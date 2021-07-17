"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PascaS3Services_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Pasca/S3/PascaS3Services"));
const ErrorLog_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ErrorLog"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Global_1 = global[Symbol.for('ioc.use')]("App/Global");
const className = 'PascaS3PengumummanController';
const renderName = 'pasca/s3';
const picture_name = 'banner_s3.jpg';
const subfolder = `/${Env_1.default.get('PREFIX')}`;
class PascaS3PengumummanController {
    async get_pengumuman({ view, auth }) {
        await auth.authenticate();
        const tahunSasaran = await PascaS3Services_1.default.get_sasaran();
        const get_pengumuman = await PascaS3Services_1.default.get_pengumuman();
        const uploadAction = subfolder + '/admin/' + renderName + '/pengumuman/upload-image';
        return view.render(renderName + '/pengumuman', { get_pengumuman, uploadAction, tahunSasaran });
    }
    async upload_image({ request }) {
        const banner = request.file('banner', {
            size: '2mb',
            extnames: ['jpg'],
        });
        if (banner) {
            await banner.move(Application_1.default.publicPath('uploads'), {
                name: picture_name,
                overwrite: true,
            });
        }
    }
    async update_pengumuman({ request, session, response }) {
        try {
            const { pengumuman, laporan_online, tujuan, target_responden, jadwal, hubungi_kami } = request.all();
            const store = await PascaS3Services_1.default.update_pengumuman(Env_1.default.get('APP_URL') + '/uploads/' + picture_name, pengumuman, laporan_online, tujuan, target_responden, jadwal, hubungi_kami);
            if (store) {
                Global_1.message(session, 'notification', 'success', 'Berhasil memperbarui pengumuman');
            }
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'store_pengumuman', error.toString(), request.ip());
            Global_1.message(session, 'notification', 'danger', 'Gagal mengubah pengumuman');
            return response.redirect('back');
        }
    }
}
exports.default = PascaS3PengumummanController;
//# sourceMappingURL=PascaS3PengumummanController.js.map