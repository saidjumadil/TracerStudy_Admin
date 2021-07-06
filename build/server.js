"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const source_map_support_1 = __importDefault(require("source-map-support"));
const standalone_1 = require("@adonisjs/core/build/standalone");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
source_map_support_1.default.install({ handleUncaughtExceptions: false });
const options = {
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, './ssl_certificate/unsyiah.ac.id.key')),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, './ssl_certificate/unsyiah.ac.id.crt')),
};
new standalone_1.Ignitor(__dirname).httpServer().start((handle) => {
    return https_1.default.createServer(options, handle);
});
//# sourceMappingURL=server.js.map