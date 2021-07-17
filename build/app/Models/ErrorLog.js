"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
class ErrorLog extends Orm_1.BaseModel {
    static async error_log(nama_class, nama_function, describe, ip_address) {
        return await Database_1.default.table('error_log').insert({
            class: nama_class,
            function: nama_function,
            describe: describe,
            ip_address: ip_address,
        });
    }
}
exports.default = ErrorLog;
//# sourceMappingURL=ErrorLog.js.map