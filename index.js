import express from 'express';
import path from 'path';

// import file system module
import fs from 'fs';

import {exec} from 'child_process';

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
        console.log(path.resolve());
        res.sendFile(path.join(path.resolve(), 'index.html'));
    }
);

app.post('/api/post-code', (req, res) => {
        console.log(req.body);
        // write the req.body.code to a file named main.cpp and overwrite if it already exists
        fs.writeFile('main.cpp', req.body.code, (err) => {
                if (err) {
                    console.log(err);
                    res.send('Error');
                } else {
                    console.log('File written successfully\n');
                    res.send('Success');
                }
            }
        );
    }
);

app.get('/api/get-output', (req, res) => {
    // execute the docker run command with image named cpp-test and get the output logged to a file named output.txt also send the output to the client
    exec('docker run cpp-test > output.txt', (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                res.send('Error');
            } else {
                console.log('Output written successfully\n');
                fs.readFile('output.txt', 'utf8', (err, data) => {
                        if (err) {
                            console.log(err);
                            res.send('Error');
                        } else {
                            console.log('Output read successfully\n');
                            res.json(data);
                        }
                    }
                );
            }
        }
    );
});


app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
    }
);