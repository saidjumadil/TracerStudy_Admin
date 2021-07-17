"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class D3User extends Orm_1.BaseModel {
    static async hashPassword(d3User) {
        if (d3User.$dirty.password) {
            d3User.password = await Hash_1.default.make(d3User.password);
        }
    }
    static async get_users(current_user) {
        if (current_user.username === 'root') {
            return await Database_1.default.connection(this.conn)
                .query()
                .from('users')
                .select('*')
                .whereNot('username', 'root');
        }
        else {
            return await Database_1.default.connection(this.conn)
                .query()
                .from('users')
                .select('*')
                .whereNot('username', 'root')
                .whereNot('permission_d3', 2)
                .whereNot('permission_pasca_s2', 2)
                .whereNot('permission_pasca_s3', 2)
                .whereNot('permission_profesi', 2);
        }
    }
    static async get_availabe_username(username) {
        return await Database_1.default.connection(this.conn).from('users').where('username', username).first();
    }
    static async get_availabe_email(email) {
        return await Database_1.default.connection(this.conn).from('users').where('email', email).first();
    }
    static async get_available_users(username, email_lupapassword) {
        return await Database_1.default.connection(this.conn)
            .from('users')
            .where('username', username)
            .where('email', email_lupapassword)
            .first();
    }
    static async insert_users(username, nama, email, password, legacy_role, permission_d3, permission_pasca_s2, permission_pasca_s3, permission_profesi) {
        return await Database_1.default.connection(this.conn).table('users').insert({
            username,
            nama,
            email,
            password,
            legacy_role,
            permission_d3,
            permission_pasca_s2,
            permission_pasca_s3,
            permission_profesi,
        });
    }
    static async hapus_user(username) {
        return await this.query().where('username', username).delete();
    }
    static async update_users(username, nama, legacy_role, permission_d3, permission_pasca_s2, permission_pasca_s3, permission_profesi) {
        return await Database_1.default.connection(this.conn).from('users').where('username', username).update({
            nama: nama,
            legacy_role: legacy_role,
            permission_d3: permission_d3,
            permission_pasca_s2: permission_pasca_s2,
            permission_pasca_s3: permission_pasca_s3,
            permission_profesi: permission_profesi,
        });
    }
    static async cek_perubahan_password(username) {
        return await Database_1.default.connection(this.conn).from('users').where('username', username).first();
    }
    static async jumlah_ubah_password(username, waktu_ubah, jumlah_ubah_password) {
        return await Database_1.default.connection(this.conn).from('users').where('username', username).update({
            password_terakhir_reset: waktu_ubah,
            password_jumlah_terakhir_reset: jumlah_ubah_password,
        });
    }
    static async reset_jumlah(username) {
        return await Database_1.default.connection(this.conn)
            .from('users')
            .update({ password_jumlah_terakhir_reset: 0 })
            .where('username', username);
    }
    static async ubah_password(username, hashPassword) {
        return await Database_1.default.from('users').where('username', username).update({
            password: hashPassword,
        });
    }
}
D3User.table = 'users';
D3User.conn = 'cdc_tracerstudy_admin';
D3User.primaryKey = 'username';
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", String)
], D3User.prototype, "username", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], D3User.prototype, "nama", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], D3User.prototype, "legacy_role", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], D3User.prototype, "email", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], D3User.prototype, "permission_d3", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], D3User.prototype, "permission_pasca_s2", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], D3User.prototype, "permission_pasca_s3", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], D3User.prototype, "permission_profesi", void 0);
__decorate([
    Orm_1.column({ serializeAs: null }),
    __metadata("design:type", String)
], D3User.prototype, "password", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], D3User.prototype, "rememberMeToken", void 0);
__decorate([
    Orm_1.beforeSave(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [D3User]),
    __metadata("design:returntype", Promise)
], D3User, "hashPassword", null);
exports.default = D3User;
//# sourceMappingURL=User.js.map