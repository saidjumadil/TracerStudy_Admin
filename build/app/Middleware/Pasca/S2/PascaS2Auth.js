"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'pasca.s3.';
class PascaS2Auth {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if (auth.user?.permission_pasca_s2 === 0) {
            return response.redirect().toRoute('admin.' + routeName + 'index');
        }
        return await next();
    }
}
exports.default = PascaS2Auth;
//# sourceMappingURL=PascaS2Auth.js.map