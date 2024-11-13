"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = void 0;
const defaultOptions = {
    email: 'name@example.org',
    sender: 'name@example.org',
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: true,
};
function getOptions(emailOrOptions) {
    let options = defaultOptions;
    if (typeof emailOrOptions === 'string') {
        options = Object.assign(Object.assign({}, options), { email: emailOrOptions });
    }
    else {
        options = Object.assign(Object.assign({}, options), emailOrOptions);
    }
    return options;
}
exports.getOptions = getOptions;
//# sourceMappingURL=options.js.map