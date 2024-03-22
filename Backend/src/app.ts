import bodyParser from 'body-parser';
import express from 'express';
import { join } from "path";
import { readFileSync } from "fs";
import logger from './utils/functions/logger';
import helmet from 'helmet';
const server = express();
server.use(bodyParser.urlencoded({
    extended: true
  }));

server.use(
    helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        'Accept':'application/json',
        'Content-Type':'text/plain',
        'Authorization':'Basic YTph',
    },
  }));

server.get('/', (req, res) => {
    res.status(200);
    res.send('WORKING');
})


server.get('/requestStatus', (req, res) =>{
    var response: { [projectName: string] : number; } = {};
    var promiseList : Promise<number | void>[] = []
    for (const project of JSON.parse(readFileSync(join("resources\\", "project_Names.json"), 'utf-8'))) {
        promiseList.push((fetch(`http://qkbld-${project}.westeurope.cloudapp.azure.com:8810/rest/version`, {headers :new Headers([['Authorization','Basic YTph']])})        
       .then(fetchResult =>{ response[project] = fetchResult.status ? fetchResult.status:200})
       .catch(()=>response[project]=404)))
    }
    Promise.all(promiseList).then(()=>res.send(JSON.stringify(response)))
});

server.listen(8080, () => {
    console.log("I'm listening");
});