"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'pasca.s2.';
class D3Auth {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if (auth.user?.permission_d3 === 0) {
            return response.redirect().toRoute('admin.' + routeName + 'index');
        }
        return await next();
    }
}
exports.default = D3Auth;
//# sourceMappingURL=D3Auth.js.map