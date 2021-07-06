"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Server"));
Server_1.default.middleware.register([
    () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("Adonis/Core/BodyParser"))),
    () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("Adonis/Addons/Shield"))),
]);
Server_1.default.middleware.registerNamed({
    user: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/User"))),
    guest: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Guest"))),
    operator: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Operator"))),
    d3Superadmin: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/D3/D3SuperAdmin"))),
    d3Admin: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/D3/D3Admin"))),
    d3Enum: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/D3/D3Enum"))),
    d3Kajur: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/D3/D3Kajur"))),
    d3Auth: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/D3/D3Auth"))),
    d3Step12: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/D3/D3Step12"))),
    d3Step3: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/D3/D3Step3"))),
    d3Step4: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/D3/D3Step4"))),
    pascaS2Superadmin: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S2/PascaS2SuperAdmin"))),
    pascaS2Admin: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S2/PascaS2Admin"))),
    pascaS2Enum: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S2/PascaS2Enum"))),
    pascaS2Kajur: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S2/PascaS2Kajur"))),
    pascaS2Auth: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S2/PascaS2Auth"))),
    pascaS2Step12: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S2/PascaS2Step12"))),
    pascaS2Step3: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S2/PascaS2Step3"))),
    pascaS2Step4: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S2/PascaS2Step4"))),
    pascaS3Superadmin: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S3/PascaS3SuperAdmin"))),
    pascaS3Admin: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S3/PascaS3Admin"))),
    pascaS3Enum: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S3/PascaS3Enum"))),
    pascaS3Kajur: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S3/PascaS3Kajur"))),
    pascaS3Auth: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S3/PascaS3Auth"))),
    pascaS3Step12: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S3/PascaS3Step12"))),
    pascaS3Step3: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S3/PascaS3Step3"))),
    pascaS3Step4: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Pasca/S3/PascaS3Step4"))),
    profesiSuperadmin: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Profesi/ProfesiSuperAdmin"))),
    profesiAdmin: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Profesi/ProfesiAdmin"))),
    profesiEnum: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Profesi/ProfesiEnum"))),
    profesiKajur: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Profesi/ProfesiKajur"))),
    profesiAuth: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Profesi/ProfesiAuth"))),
    profesiStep12: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Profesi/ProfesiStep12"))),
    profesiStep3: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Profesi/ProfesiStep3"))),
    profesiStep4: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]("App/Middleware/Profesi/ProfesiStep4"))),
});
//# sourceMappingURL=kernel.js.map