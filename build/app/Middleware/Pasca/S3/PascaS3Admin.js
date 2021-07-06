"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'pasca.s3.';
class PascaS3Admin {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1, 2].includes(auth.user?.permission_pasca_s3)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = PascaS3Admin;
//# sourceMappingURL=PascaS3Admin.js.map