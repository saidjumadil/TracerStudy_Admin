"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    async handle({ response, auth }, next) {
        try {
            await auth.authenticate();
            return await next();
        }
        catch (error) {
            console.log(error);
            return response.redirect().toRoute('auth.login');
        }
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map