"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorLog_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ErrorLog"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const randomstring_1 = __importDefault(require("randomstring"));
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Global_1 = global[Symbol.for('ioc.use')]("App/Global");
const className = 'AuthController';
class AuthController {
    index({ view }) {
        return view.render('login');
    }
    async authentication({ auth, request, response, session }) {
        try {
            const { username, password } = request.all();
            const user = await auth.attempt(username, password);
            if (user) {
                return response.redirect().toRoute('admin.d3.index');
            }
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'authentication', error.toString(), request.ip());
            Global_1.message(session, 'notification_login', 'danger', 'Password atau username salah atau Akun sedang login pada perangkat lain');
            return response.redirect('back');
        }
    }
    async FormUbahPassword({ auth, view }) {
        await auth.authenticate();
        return view.render('ubah_password');
    }
    async ActionUbahPassword({ request, session, auth, response }) {
        try {
            const user = await auth.authenticate();
            let cek_perubahan_password = await User_1.default.cek_perubahan_password(user.username);
            let jumlah_ubah_password = cek_perubahan_password.password_jumlah_terakhir_reset;
            var waktu_diizinkan_ubah = new Date(cek_perubahan_password.password_terakhir_reset);
            waktu_diizinkan_ubah.setHours(waktu_diizinkan_ubah.getHours() + 24);
            const get_time_now = Date.now();
            var waktu_sekarang = new Date(get_time_now);
            if (user.legacy_role > 2 &&
                waktu_sekarang < waktu_diizinkan_ubah &&
                cek_perubahan_password.password_jumlah_terakhir_reset >= 2) {
                Global_1.message(session, 'notification', 'danger', 'Tidak dapat mengubah password, silahkan coba lagi pada ' +
                    Global_1.formatDate(waktu_diizinkan_ubah) +
                    '. Password hanya dapat diganti 2 kali dalam 1x24 jam');
                return response.redirect('back');
            }
            const { password_lama, password_baru, konfirmasi_password } = request.all();
            const verify = await Hash_1.default.verify(user.password, password_lama);
            const hash_password = await Hash_1.default.make(password_baru);
            if (verify && password_baru === konfirmasi_password) {
                await User_1.default.ubah_password(user.username, hash_password);
                if (waktu_sekarang > waktu_diizinkan_ubah && jumlah_ubah_password >= 2) {
                    await User_1.default.reset_jumlah(user.username);
                    jumlah_ubah_password = 0;
                    await User_1.default.jumlah_ubah_password(user.username, waktu_sekarang, jumlah_ubah_password + 1);
                    Global_1.message(session, 'notification', 'success', 'Password berhasil diubah');
                    return response.redirect('back');
                }
                else {
                    await User_1.default.jumlah_ubah_password(user.username, waktu_sekarang, jumlah_ubah_password + 1);
                    Global_1.message(session, 'notification', 'success', 'Password berhasil diubah');
                    return response.redirect('back');
                }
            }
            else if (password_baru !== konfirmasi_password) {
                Global_1.message(session, 'notification', 'danger', 'Kata sandi konfirmasi tidak sama');
                return response.redirect('back');
            }
            else if (!verify) {
                Global_1.message(session, 'notification', 'danger', 'Kata sandi lama salah');
                return response.redirect('back');
            }
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'ActionUbahPassword', error.toString(), request.ip());
            Global_1.message(session, 'notification', 'danger', 'Gagal Mengubah Kata Sandi');
            return response.redirect('back');
        }
    }
    async ActionLupaPassword({ request, response, session }) {
        try {
            const { username_lupapassword, email_lupapassword } = request.all();
            const get_akun = await User_1.default.get_available_users(username_lupapassword, email_lupapassword);
            if (get_akun) {
                let cek_perubahan_password = await User_1.default.cek_perubahan_password(username_lupapassword);
                let jumlah_ubah_password = cek_perubahan_password.password_jumlah_terakhir_reset;
                var waktu_diizinkan_ubah = new Date(cek_perubahan_password.password_terakhir_reset);
                waktu_diizinkan_ubah.setHours(waktu_diizinkan_ubah.getHours() + 24);
                const get_time_now = Date.now();
                var waktu_sekarang = new Date(get_time_now);
                if (get_akun.legacy_role > 2 &&
                    waktu_sekarang < waktu_diizinkan_ubah &&
                    cek_perubahan_password.password_jumlah_terakhir_reset >= 2) {
                    Global_1.message(session, 'notification_lupapassword', 'danger', 'Tidak dapat reset password, silahkan coba lagi pada ' +
                        Global_1.formatDate(waktu_diizinkan_ubah) +
                        '. Password hanya dapat diganti 2 kali dalam 1x24 jam');
                    return response.redirect('back');
                }
                const passwordClear = this.generate_password();
                const hashPassword = await Hash_1.default.make(passwordClear);
                await User_1.default.ubah_password(username_lupapassword, hashPassword);
                const emailData = {
                    nama: get_akun.nama,
                    username: username_lupapassword,
                    password: passwordClear,
                };
                if (waktu_sekarang > waktu_diizinkan_ubah && jumlah_ubah_password >= 2) {
                    await User_1.default.reset_jumlah(username_lupapassword);
                    jumlah_ubah_password = 0;
                }
                await User_1.default.jumlah_ubah_password(username_lupapassword, waktu_sekarang, jumlah_ubah_password + 1);
                const kirimEmail = await Mail_1.default.send((message) => {
                    message
                        .to(email_lupapassword)
                        .from(Env_1.default.get('MAIL_USERNAME'), Env_1.default.get('MAIL_PASSWORD'))
                        .subject('Konfirmasi Reset Password Operator Tracer Study Universitas Syiah Kuala')
                        .htmlView('email/lupa_password', emailData);
                });
                if (!kirimEmail) {
                    Global_1.message(session, 'notification_lupapassword', 'danger', 'gagal mengirim email!');
                    return response.redirect('back');
                }
                Global_1.message(session, 'notification_lupapassword', 'success', 'password anda berhasil direset, silahkan cek email anda!');
                return response.redirect('back');
            }
            else {
                Global_1.message(session, 'notification_lupapassword', 'warning', 'username atau email! belum terdaftar!');
                return response.redirect('back');
            }
        }
        catch (error) {
            console.log(error);
            await ErrorLog_1.default.error_log(className, 'forget_password', error.toString(), request.ip());
            Global_1.message(session, 'notification_lupapassword', 'danger', 'gagal mengirim email!');
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
    async logout({ auth, response }) {
        try {
            await auth.logout();
            console.log('tes');
            return response.redirect().toRoute('auth.login');
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map