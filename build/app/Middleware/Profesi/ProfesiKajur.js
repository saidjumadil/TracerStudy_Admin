"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'profesi.';
class ProfesiKajur {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1, 2, 3, 4].includes(auth.user?.permission_profesi)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = ProfesiKajur;
//# sourceMappingURL=ProfesiKajur.js.map