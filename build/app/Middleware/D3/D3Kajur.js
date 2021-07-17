"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'd3.';
class D3Kajur {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1, 2, 3, 4].includes(auth.user?.permission_d3)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = D3Kajur;
//# sourceMappingURL=D3Kajur.js.map