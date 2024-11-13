"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = void 0;
exports.isEmail = (email) => {
    email = (email || '').trim();
    if (email.length === 0) {
        return 'Email not provided';
    }
    const split = email.split('@');
    if (split.length < 2) {
        return 'Email does not contain "@".';
    }
    else {
        const [domain] = split.slice(-1);
        if (domain.indexOf('.') === -1) {
            return 'Must contain a "." after the "@".';
        }
    }
};
//# sourceMappingURL=regex.js.map