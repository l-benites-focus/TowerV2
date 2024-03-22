"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const fs_1 = require("fs");
const helmet_1 = __importDefault(require("helmet"));
const server = (0, express_1.default)();
server.use(body_parser_1.default.urlencoded({
    extended: true
}));
server.use(helmet_1.default.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        'Authorization': 'Basic YTph',
    },
}));
server.get('/', (req, res) => {
    res.status(200);
    res.send('WORKING');
});
server.get('/requestStatus', (req, res) => {
    var response = {};
    var promiseList = [];
    for (const project of JSON.parse((0, fs_1.readFileSync)((0, path_1.join)("resources\\", "project_Names.json"), 'utf-8'))) {
        promiseList.push((fetch(`http://qkbld-${project}.westeurope.cloudapp.azure.com:8810/rest/version`, { headers: new Headers([['Authorization', 'Basic YTph']]) })
            .then(json => { response[project] = json.status ? json.status : 200; })
            .catch(() => response[project] = 404)));
    }
    Promise.all(promiseList).then(() => res.send(JSON.stringify(response)));
});
server.listen(8080, () => {
    console.log("I'm listening");
});
