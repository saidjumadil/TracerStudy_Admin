"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'd3.';
class Operator {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1, 2].includes(auth.user?.legacy_role)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = Operator;
//# sourceMappingURL=Operator.js.map