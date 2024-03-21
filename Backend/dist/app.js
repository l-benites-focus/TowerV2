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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const serverData_types_1 = require("./utils/types/serverData.types");
const server = (0, express_1.default)();
server.use(body_parser_1.default.urlencoded({
    extended: true
}));
server
    .get('/', (req, res) => {
    res.status(200);
    res.send('WORKING');
})
    .post('/requestStatus', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('receiving data ...');
        console.log('body is ', req.body.projectName);
        var projectName = req.body.projectName;
        const headers = new Headers();
        headers.set('Content-Type', 'text/plain');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', 'Basic YTph');
        const request = new Request(`http://qkbld-${projectName}.westeurope.cloudapp.azure.com:8810/rest/version`, {
            method: 'GET',
            headers: headers,
        });
        try {
            const response = yield fetch(request);
            if (!response.ok) {
                console.error(`[ERROR - getLatestBuild] status: ${response.status}`);
                res.send(serverData_types_1.REQUEST_STATUS.BROKEN.toString());
            }
            else {
                res.send(serverData_types_1.REQUEST_STATUS.UP.toString());
            }
        }
        catch (error) {
            res.send(serverData_types_1.REQUEST_STATUS.DOWN.toString());
        }
        res.end();
    });
});
server.listen(8080, () => {
    console.log("I'm listening");
});
