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
class UsersMonitoring extends Orm_1.BaseModel {
}
UsersMonitoring.table = 'users_monitoring';
UsersMonitoring.connection = 'cdc_tracerstudy_d3';
UsersMonitoring.primaryKey = 'id';
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], UsersMonitoring.prototype, "id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], UsersMonitoring.prototype, "username", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], UsersMonitoring.prototype, "nama", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], UsersMonitoring.prototype, "nim", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], UsersMonitoring.prototype, "periode_wisuda", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], UsersMonitoring.prototype, "no_hape_1", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], UsersMonitoring.prototype, "hp_valid_1", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], UsersMonitoring.prototype, "no_hape_2", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], UsersMonitoring.prototype, "hp_valid_2", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], UsersMonitoring.prototype, "monitoring_1", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], UsersMonitoring.prototype, "monitoring_2", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], UsersMonitoring.prototype, "monitoring_3", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Date)
], UsersMonitoring.prototype, "tanggal_isi", void 0);
exports.default = UsersMonitoring;
//# sourceMappingURL=D3UsersMonitoring.js.map