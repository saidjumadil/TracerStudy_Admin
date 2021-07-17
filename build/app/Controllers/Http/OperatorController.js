"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const ErrorLog_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ErrorLog"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const randomstring_1 = __importDefault(require("randomstring"));
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const className = 'OperatorController';
function message(session, nama_notif, type, message) {
    session.flash({
        [nama_notif]: {
            type: type,
            message: message,
        },
    });
}
class OperatorController {
    async get_operator({ view, auth }) {
        const current_user = await auth.authenticate();
        const users = await User_1.default.get_users(current_user);
        return view.render('operator/operator', { users });
    }
    async register_users({ request, session, response }) {
        try {
            const { nama, username, email, legacy_role, permission } = request.all();
            const cek_username = await User_1.default.get_availabe_username(username);
            if (cek_username) {
                message(session, 'notification_user', 'danger', 'username sudah pernah digunakan!');
                return response.redirect('back');
            }
            const cek_email = await User_1.default.get_availabe_email(email);
            if (cek_email) {
                message(session, 'notification_user', 'danger', 'email sudah pernah digunakan!');
                return response.redirect('back');
            }
            const permission_d3 = permission.includes('1') ? legacy_role : 0;
            const permission_pasca_s2 = permission.includes('2') ? legacy_role : 0;
            const permission_pasca_s3 = permission.includes('3') ? legacy_role : 0;
            const permission_profesi = permission.includes('4') ? legacy_role : 0;
            const password = this.generate_password();
            const hash_password = await Hash_1.default.make(password);
            const insert_users = await User_1.default.insert_users(username, nama, email, hash_password, legacy_role, permission_d3, permission_pasca_s2, permission_pasca_s3, permission_profesi);
            if (insert_users) {
                const emailData = { nama, username, password };
                const kirimEmail = await Mail_1.default.send((message) => {
                    message
                        .to(email)
                        .from(Env_1.default.get('MAIL_USERNAME'), Env_1.default.get('MAIL_PASSWORD'))
                        .subject('Konfirmasi Akun Operator Tracer Study Universitas Syiah Kuala')
                        .htmlView('email/konfirmasi', emailData);
                });
                if (!kirimEmail) {
                    message(session, 'notification_user', 'danger', 'gagal mengirim email!');
                    return response.redirect('back');
                }
            }
            message(session, 'notification_user', 'success', 'Berhasil menambah akun ' + nama);
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'register_users', error.toString(), request.ip());
            message(session, 'notification_user', 'danger', 'gagal mengirim email!');
            return response.redirect('back');
        }
    }
    async hapus_user({ request, session, response }) {
        try {
            const { username } = request.all();
            const hapus_user = await User_1.default.hapus_user(username);
            if (hapus_user) {
                message(session, 'notification', 'success', 'Berhasil menghapus user');
                return response.redirect('back');
            }
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'hapus_user', error.toString(), request.ip());
            message(session, 'notification', 'danger', 'Gagal menghapus user');
            return response.redirect('back');
        }
    }
    async update_users({ request, session, response }) {
        try {
            let { username, nama, legacy_role, permission_d3, permission_pasca_s2, permission_pasca_s3, permission_profesi, } = request.all();
            permission_d3 = permission_d3 ? legacy_role : 0;
            permission_pasca_s2 = permission_pasca_s2 ? legacy_role : 0;
            permission_pasca_s3 = permission_pasca_s3 ? legacy_role : 0;
            permission_profesi = permission_profesi ? legacy_role : 0;
            const update_akun = await User_1.default.update_users(username, nama, legacy_role, permission_d3, permission_pasca_s2, permission_pasca_s3, permission_profesi);
            if (update_akun) {
                message(session, 'notification', 'success', 'Berhasil memperbarui akun ' + nama);
                return response.redirect('back');
            }
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'update_users', error.toString(), request.ip());
            message(session, 'notification', 'danger', 'Gagal memperbarui data');
            return response.redirect('back');
        }
    }
    async reset_password({ request, session, response }) {
        try {
            const { username_lupapassword, email_lupapassword } = request.all();
            const get_akun = await User_1.default.get_available_users(username_lupapassword, email_lupapassword);
            if (get_akun) {
                const passwordClear = this.generate_password();
                const hashPassword = await Hash_1.default.make(passwordClear);
                await User_1.default.ubah_password(username_lupapassword, hashPassword);
                const emailData = {
                    nama: get_akun.nama,
                    username: username_lupapassword,
                    password: passwordClear,
                };
                const kirimEmail = await Mail_1.default.send((message) => {
                    message
                        .to(email_lupapassword)
                        .from(Env_1.default.get('MAIL_USERNAME'), Env_1.default.get('MAIL_PASSWORD'))
                        .subject('Konfirmasi Reset Password Operator Tracer Study Universitas Syiah Kuala')
                        .htmlView('email/lupa_password', emailData);
                });
                if (!kirimEmail) {
                    message(session, 'notification', 'danger', 'gagal mengirim email!');
                    return response.redirect('back');
                }
                message(session, 'notification', 'success', 'password anda berhasil direset, silahkan cek email anda!');
                return response.redirect('back');
            }
            else {
                message(session, 'notification', 'warning', 'username atau email! belum terdaftar!');
                return response.redirect('back');
            }
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'forget_password', error.toString(), request.ip());
            message(session, 'notification', 'danger', 'Gagal mengubah password');
            return response.redirect('back');
        }
    }
    generate_password() {
        try {
            return randomstring_1.default.generate({
                length: 8,
                charset: '1234567890abcdefghijklmnopqrstuvwxyz',
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = OperatorController;
//# sourceMappingURL=OperatorController.js.map