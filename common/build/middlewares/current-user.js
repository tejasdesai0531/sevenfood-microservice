"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = (req, res, next) => {
    var _a;
    if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.token)) {
        return next();
    }
    try {
        const payload = jsonwebtoken_1.default.verify(req.headers.token, process.env.JWT_KEY);
        req.currentUser = payload;
    }
    catch (err) { }
    next();
};
exports.currentUser = currentUser;
