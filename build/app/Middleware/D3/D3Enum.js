"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'd3.';
class D3Enum {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1, 2, 4].includes(auth.user?.permission_d3)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = D3Enum;
//# sourceMappingURL=D3Enum.js.map