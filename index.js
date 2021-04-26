'use strict';
const express = require('express');
const fs = require('fs');
const app = express();

if(!process.env.FLIXTUBE_PORT) {
    throw new Error('Please, specify the port number for the HTTP server with the environmrnt variable FLIXTUBE_PORT');
}

const port = process.env.FLIXTUBE_PORT;

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/video', (req, res) => {
    const path = './videos/20210416_130250.mp4';

    fs.stat(path, (err, stats) => {
        if(err) {
            console.error('An error occured');
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            'Content-Length': stats.size,
            'Content-Type': 'video/mp4',
        });

        fs.createReadStream(path).pipe(res);
    });

});

app.listen(port, () => {
    console.log(`Flix Tube app listening on port ${port}...`);
});
