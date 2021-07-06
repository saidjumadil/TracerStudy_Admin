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
class Sasaran extends Orm_1.BaseModel {
}
Sasaran.table = 'sasaran';
Sasaran.connection = 'cdc_tracerstudy_d3';
Sasaran.primaryKey = 'id';
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], Sasaran.prototype, "id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Sasaran.prototype, "tahun", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Sasaran.prototype, "status_aktif", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Date)
], Sasaran.prototype, "waktu_mulai", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Date)
], Sasaran.prototype, "waktu_berakhir", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Sasaran.prototype, "status_import_monitoring", void 0);
exports.default = Sasaran;
//# sourceMappingURL=D3Sasaran.js.map