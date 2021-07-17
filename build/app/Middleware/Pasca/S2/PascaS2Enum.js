"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'pasca.s2.';
class PascaS2Enum {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1, 2, 4].includes(auth.user?.permission_pasca_s2)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = PascaS2Enum;
//# sourceMappingURL=PascaS2Enum.js.map