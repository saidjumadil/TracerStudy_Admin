"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'pasca.s2.';
class PascaS2Kajur {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1, 2, 3, 4].includes(auth.user?.permission_pasca_s2)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = PascaS2Kajur;
//# sourceMappingURL=PascaS2Kajur.js.map