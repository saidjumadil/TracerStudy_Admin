"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const databaseConfig = {
    connection: Env_1.default.get('DB_CONNECTION'),
    connections: {
        cdc_tracerstudy_admin: {
            client: 'mysql',
            connection: {
                host: Env_1.default.get('DB_HOST_Admin', 'localhost'),
                port: Env_1.default.get('DB_PORT_Admin', ''),
                user: Env_1.default.get('DB_USER_Admin', 'root'),
                password: Env_1.default.get('DB_PASSWORD_Admin', ''),
                database: Env_1.default.get('DB_DATABASE_Admin', 'cdc_tracerstudy_admin'),
            },
            migrations: {
                naturalSort: true,
            },
            healthCheck: true,
            debug: true,
        },
        cdc_tracerstudy_d3: {
            client: 'mysql',
            connection: {
                host: Env_1.default.get('DB_HOST_D3', 'localhost'),
                port: Env_1.default.get('DB_PORT_D3', ''),
                user: Env_1.default.get('DB_USER_D3', 'root'),
                password: Env_1.default.get('DB_PASSWORD_D3', ''),
                database: Env_1.default.get('DB_DATABASE_D3', 'cdc_tracerstudy_d3'),
            },
            migrations: {
                naturalSort: true,
            },
            healthCheck: true,
            debug: true,
        },
        cdc_tracerstudy_profesi: {
            client: 'mysql',
            connection: {
                host: Env_1.default.get('DB_HOST_PROFESI', 'localhost'),
                port: Env_1.default.get('DB_PORT_PROFESI', ''),
                user: Env_1.default.get('DB_USER_PROFESI', 'root'),
                password: Env_1.default.get('DB_PASSWORD_PROFESI', ''),
                database: Env_1.default.get('DB_DATABASE_PROFESI', 'cdc_tracerstudy_profesi'),
            },
            migrations: {
                naturalSort: true,
            },
            healthCheck: true,
            debug: true,
        },
        cdc_tracerstudy_pasca_s2: {
            client: 'mysql',
            connection: {
                host: Env_1.default.get('DB_HOST_PASCA_S2', 'localhost'),
                port: Env_1.default.get('DB_PORT_PASCA_S2', ''),
                user: Env_1.default.get('DB_USER_PASCA_S2', 'root'),
                password: Env_1.default.get('DB_PASSWORD_PASCA_S2', ''),
                database: Env_1.default.get('DB_DATABASE_PASCA_S2', 'cdc_tracerstudy_pasca_s2'),
            },
            migrations: {
                naturalSort: true,
            },
            healthCheck: true,
            debug: true,
        },
        cdc_tracerstudy_pasca_s3: {
            client: 'mysql',
            connection: {
                host: Env_1.default.get('DB_HOST_PASCA_S3', 'localhost'),
                port: Env_1.default.get('DB_PORT_PASCA_S3', ''),
                user: Env_1.default.get('DB_USER_PASCA_S3', 'root'),
                password: Env_1.default.get('DB_PASSWORD_PASCA_S3', ''),
                database: Env_1.default.get('DB_DATABASE_PASCA_S3', 'cdc_tracerstudy_pasca_s3'),
            },
            migrations: {
                naturalSort: true,
            },
            healthCheck: true,
            debug: true,
        },
        cdc_exsurvey: {
            client: 'mysql',
            connection: {
                host: Env_1.default.get('DB_HOST_CDC_EXSURVEY', 'localhost'),
                port: Env_1.default.get('DB_PORT_CDC_EXSURVEY', ''),
                user: Env_1.default.get('DB_USER_CDC_EXSURVEY', 'root'),
                password: Env_1.default.get('DB_PASSWORD_CDC_EXSURVEY', ''),
                database: Env_1.default.get('DB_DATABASE_CDC_EXSURVEY', 'cdc_exsurvey'),
            },
            migrations: {
                naturalSort: true,
            },
            healthCheck: true,
            debug: true,
        },
    },
};
exports.default = databaseConfig;
//# sourceMappingURL=database.js.map