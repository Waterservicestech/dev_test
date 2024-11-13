"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestMx = exports.getMx = void 0;
const dns_1 = __importDefault(require("dns"));
exports.getMx = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(r => dns_1.default.resolveMx(domain, (err, addresses) => {
        if (err || !addresses)
            return r([]);
        r(addresses);
    }));
});
exports.getBestMx = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    const addresses = yield exports.getMx(domain);
    let bestIndex = 0;
    for (let i = 0; i < addresses.length; i++) {
        if (addresses[i].priority < addresses[bestIndex].priority) {
            bestIndex = i;
        }
    }
    return addresses[bestIndex];
});
//# sourceMappingURL=dns.js.map