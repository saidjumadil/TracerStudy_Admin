"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeName = 'profesi.';
class ProfesiEnum {
    async handle({ response, auth }, next) {
        await auth.authenticate();
        if ([1, 2, 4].includes(auth.user?.permission_profesi)) {
            return await next();
        }
        return response.redirect().toRoute('admin.' + routeName + 'index');
    }
}
exports.default = ProfesiEnum;
//# sourceMappingURL=ProfesiEnum.js.map