"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'd3.';
class D3SuperAdmin {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1].includes(auth.user?.permission_d3)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = D3SuperAdmin;
//# sourceMappingURL=D3SuperAdmin.js.map