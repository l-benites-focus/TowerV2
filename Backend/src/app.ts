import bodyParser from 'body-parser';
import express from 'express';
import { join } from "path";
import { readFileSync } from "fs";
import helmet from 'helmet';
import router from './router';
const server = express();

server.use('/assets', express.static(__dirname + '/assets'));
server.use(router);
server.use(bodyParser.urlencoded({
    extended: true
  }));

server.use(
    helmet.contentSecurityPolicy({
    useDefaults: true,
  }));
server.get('/', (req, res) => {
    res.status(200);
    res.send('WORKING');
})
server.on('exit', code => {
    // Only synchronous calls
    console.log(`Process exited with code: ${code}`)
})
server.get('/azureRequest', async (req, res) =>{

});


server.get('/requestStatus', async (req, res) =>{
        var response: { projectName:string, code: number, studioName:string }[] = [];
        let index = 0;
        for (const project of JSON.parse(readFileSync(join("resources\\", "project_Names.json"), 'utf-8'))) {
            index++
            const url = project == "laurens" ? `http://qkbld-${project}.westeurope.cloudapp.azure.com:8810/rest/version`:`http://${project}-qkbld.westeurope.cloudapp.azure.com:8810/rest/version`
            const result = await fetch(url,{
                method:"GET", 
                headers :{
                    "Accept": "application/json",
                    "Authorization": `Basic ${Buffer.from("tower:tf20DnN2zs").toString('base64')}`}
            }).catch(err => {})
            .then(res => {
                const code = res ? res.status:404
                response.push({projectName:project,code:code,studioName:"FocusEnt"})
            })
        }
    res.status(200)
    res.send(JSON.stringify(response))
    }
);

server.listen(8080, () => {
    console.log("I'm listening");
}).on("err", error=> console.log(error));
