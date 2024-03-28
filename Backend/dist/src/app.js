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
const path_1 = require("path");
const fs_1 = require("fs");
const helmet_1 = __importDefault(require("helmet"));
const router_1 = __importDefault(require("./router"));
const server = (0, express_1.default)();
server.use('/assets', express_1.default.static(__dirname + '/assets'));
server.use(router_1.default);
server.use(body_parser_1.default.urlencoded({
    extended: true
}));
server.use(helmet_1.default.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        'Authorization': 'Basic YTph',
    },
}));
server.get('/', (req, res) => {
    res.status(200);
    res.send('WORKING');
});
server.on('exit', code => {
    // Only synchronous calls
    console.log(`Process exited with code: ${code}`);
});
server.get('/requestStatus', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var response = {};
    //var promiseList : Promise<number | void>[] = []
    for (const project of JSON.parse((0, fs_1.readFileSync)((0, path_1.join)("resources\\", "project_Names.json"), 'utf-8'))) {
        const qkbld = project == "laurens" ? "qkbld" : "quickbuild";
        const url = project == "laurens-qkbld" ? `http://laurens-qkbld.westeurope.cloudapp.azure.com:8810/rest/version` : `http://${qkbld}-${project}.westeurope.cloudapp.azure.com:8810/rest/version`;
        const result = yield fetch(url, {
            method: "GET",
            headers: {
                'Authorization': 'Basic YTph'
            }
        }).catch(err => { });
        response[project] = result ? result.status : 404;
        //     promiseList.push(
        //         (
        //             fetch(`http://qkbld-${project}.westeurope.cloudapp.azure.com:8810/rest/version`, 
        //             {headers :new Headers([['Authorization','Basic YTph']]
        //         )}).then(fetchResult =>{ response[project] = fetchResult.status ? fetchResult.status:200})
        //             .catch(()=>response[project]=404))
        //     )
        // }
    }
    res.status(200);
    res.send(JSON.stringify(response));
}));
server.listen(8080, () => {
    console.log("I'm listening");
}).on("err", error => console.log(error));
