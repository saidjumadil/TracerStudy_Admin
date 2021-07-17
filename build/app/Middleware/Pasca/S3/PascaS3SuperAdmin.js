"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'pasca.s3.';
class PascaS3SuperAdmin {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1].includes(auth.user?.permission_pasca_s3)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = PascaS3SuperAdmin;
//# sourceMappingURL=PascaS3SuperAdmin.js.map