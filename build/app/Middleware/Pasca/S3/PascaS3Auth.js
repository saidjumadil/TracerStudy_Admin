"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'profesi.';
class PascaS3Auth {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if (auth.user?.permission_pasca_s3 === 0) {
            return response.redirect().toRoute('admin.' + routeName + 'index');
        }
        return await next();
    }
}
exports.default = PascaS3Auth;
//# sourceMappingURL=PascaS3Auth.js.map