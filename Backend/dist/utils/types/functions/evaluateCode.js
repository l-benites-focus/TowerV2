"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateCode = void 0;
const serverData_types_1 = require("../serverData.types");
function evaluateCode(code) {
    if (code == 200)
        return serverData_types_1.REQUEST_STATUS.UP;
    else if (code > 200 && code < 500 && code !== 404)
        return serverData_types_1.REQUEST_STATUS.BROKEN;
    else
        return serverData_types_1.REQUEST_STATUS.DOWN;
}
exports.evaluateCode = evaluateCode;
