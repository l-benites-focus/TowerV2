"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_STATUS = exports.serverData = void 0;
class serverData {
    constructor(requestStatus, studioName, projectName) {
        this.requestStatus = requestStatus;
        this.studioName = studioName;
        this.projectName = projectName;
    }
}
exports.serverData = serverData;
var REQUEST_STATUS;
(function (REQUEST_STATUS) {
    REQUEST_STATUS[REQUEST_STATUS["UP"] = 0] = "UP";
    REQUEST_STATUS[REQUEST_STATUS["BROKEN"] = 1] = "BROKEN";
    REQUEST_STATUS[REQUEST_STATUS["DOWN"] = 2] = "DOWN";
})(REQUEST_STATUS || (exports.REQUEST_STATUS = REQUEST_STATUS = {}));
