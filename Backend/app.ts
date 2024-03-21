import bodyParser from 'body-parser';
import express from 'express';

import { REQUEST_STATUS } from './utils/types/serverData.types';
const server = express();

server.use(bodyParser.urlencoded({
    extended: true
  }));
server
.get('/', (req, res) => {
    res.status(200);
    res.send('WORKING');
})
.post('/requestStatus',async function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body.projectName);

    var projectName = req.body.projectName as string
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'text/plain');
    headers.set('Accept', 'application/json');
    headers.set(
        'Authorization',
        'Basic YTph',
    );
    const request: RequestInfo = new Request(
        `http://qkbld-${projectName}.westeurope.cloudapp.azure.com:8810/rest/version`,
        {
            method: 'GET',
            headers: headers,
        },
    );
    try {
        const response = await fetch(request);
        if (!response.ok) {
            console.error(
                `[ERROR - getLatestBuild] status: ${response.status}`
            );
            res.send( REQUEST_STATUS.BROKEN.toString());
        } else {
            res.send(REQUEST_STATUS.UP.toString())
        }
    } catch (error) {
        res.send(REQUEST_STATUS.DOWN.toString())
    }
    res.end();
});

server.listen(8080, () => {
    console.log("I'm listening");
});