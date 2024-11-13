"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOutput = void 0;
const OrderedLevels = ['regex', 'typo', 'disposable', 'mx', 'smtp'];
exports.createOutput = (failLevel, failReason) => {
    const out = { valid: true, validators: {} };
    if (failLevel) {
        out.reason = failLevel;
        out.valid = false;
    }
    let valid = true;
    for (let i = 0; i < OrderedLevels.length; i++) {
        const level = OrderedLevels[i];
        const levelOut = { valid };
        if (level === failLevel) {
            valid = false;
            levelOut.valid = false;
            levelOut.reason = failReason;
        }
        out.validators[level] = levelOut;
    }
    return out;
};
//# sourceMappingURL=output.js.map