"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
const message = (session, nama_notif, type, message) => {
    session.flash({
        [nama_notif]: {
            type: type,
            message: message,
        },
    });
};
exports.message = message;
//# sourceMappingURL=Message.js.map