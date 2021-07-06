"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'profesi.';
class ProfesiAdmin {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1, 2].includes(auth.user?.permission_profesi)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = ProfesiAdmin;
//# sourceMappingURL=ProfesiAdmin.js.map