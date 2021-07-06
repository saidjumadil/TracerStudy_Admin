"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'd3.';
class ProfesiAuth {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if (auth.user?.permission_profesi === 0) {
            return response.redirect().toRoute('admin.' + routeName + 'index');
        }
        return await next();
    }
}
exports.default = ProfesiAuth;
//# sourceMappingURL=ProfesiAuth.js.map