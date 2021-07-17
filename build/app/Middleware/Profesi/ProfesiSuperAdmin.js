"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'profesi.';
class ProfesiSuperAdmin {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1].includes(auth.user?.permission_profesi)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = ProfesiSuperAdmin;
//# sourceMappingURL=ProfesiSuperAdmin.js.map