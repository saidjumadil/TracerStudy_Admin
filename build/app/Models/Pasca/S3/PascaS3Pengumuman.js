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
Object.defineProperty(exports, "__esModule", { value: true });
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
class Pengumuman extends Orm_1.BaseModel {
}
Pengumuman.table = 'pengumuman';
Pengumuman.connection = 'cdc_tracerstudy_pasca_s3';
Pengumuman.primaryKey = 'id';
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], Pengumuman.prototype, "id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Pengumuman.prototype, "path_banner", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Pengumuman.prototype, "pengumuman", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Pengumuman.prototype, "laporan_online", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Pengumuman.prototype, "tujuan", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Pengumuman.prototype, "target_responden", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Pengumuman.prototype, "jadwal", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Pengumuman.prototype, "hubungi_kami", void 0);
exports.default = Pengumuman;
//# sourceMappingURL=PascaS3Pengumuman.js.map