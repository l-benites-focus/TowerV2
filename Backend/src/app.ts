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
    directives: {
        'Authorization':'Basic YTph',
    },
  }));
server.get('/', (req, res) => {
    res.status(200);
    res.send('WORKING');
})
server.on('exit', code => {
    // Only synchronous calls
    console.log(`Process exited with code: ${code}`)
})
  

server.get('/requestStatus', async (req, res) =>{
        var response: { [projectName: string] : number; } = {};
        //var promiseList : Promise<number | void>[] = []
        for (const project of JSON.parse(readFileSync(join("resources\\", "project_Names.json"), 'utf-8'))) {
            const qkbld = project == "laurens" ? "qkbld":"quickbuild"
            const url = project == "laurens-qkbld" ? `http://laurens-qkbld.westeurope.cloudapp.azure.com:8810/rest/version`:`http://${qkbld}-${project}.westeurope.cloudapp.azure.com:8810/rest/version`
            const result = await fetch(url,{
                method:"GET", 
                headers :{
                'Authorization':'Basic YTph'}
            }).catch(err => {})
            response[project] = result ? result.status:404
        //     promiseList.push(
        //         (
        //             fetch(`http://qkbld-${project}.westeurope.cloudapp.azure.com:8810/rest/version`, 
        //             {headers :new Headers([['Authorization','Basic YTph']]
        //         )}).then(fetchResult =>{ response[project] = fetchResult.status ? fetchResult.status:200})
        //             .catch(()=>response[project]=404))
        //     )
        // }
    }
    res.status(200)
    res.send(JSON.stringify(response))
    }
);

server.listen(8080, () => {
    console.log("I'm listening");
}).on("err", error=> console.log(error));
