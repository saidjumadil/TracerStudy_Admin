"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'd3.';
class D3Admin {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1, 2].includes(auth.user?.permission_d3)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = D3Admin;
//# sourceMappingURL=D3Admin.js.map