"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Guest {
    async handle({ response, auth }, next) {
        try {
            await auth.authenticate();
            return response.redirect().toRoute('admin.d3.index');
        }
        catch (error) {
            console.log(error);
            return await next();
        }
    }
}
exports.default = Guest;
//# sourceMappingURL=Guest.js.map