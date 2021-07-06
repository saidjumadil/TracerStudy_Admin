"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'pasca.s3.';
class PascaS3Enum {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1, 2, 4].includes(auth.user?.permission_pasca_s3)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = PascaS3Enum;
//# sourceMappingURL=PascaS3Enum.js.map