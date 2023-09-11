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

app.get('/api/get-dir', (req, res) => {

    // resolve path.resolve in the format like C:/Users/username/Desktop/cpp-ide

    
    res.json({
        dir: dir
    })
});

app.post('/api/post-code', (req, res) => {
        
        const codeToExecute = `
        #include <iostream>
        using namespace std;
        int main() {
            ${req.body.code}
            return 0;
        }`
        fs.writeFile('main.cpp', codeToExecute, (err) => {
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

    // get start time in epoch
    const startTime = new Date().getTime();
    var endTime;
    
    const pathToMain = path.resolve().replace(/\\/g, '/').concat('/main.cpp');
    exec(`docker run --rm -v ${pathToMain}:/home/sandbox/main.cpp cpp /bin/sh -c "g++ -o main main.cpp && ./main"`, (err, stdout, stderr) => {
            if (err) {
                const errorToSend = err.message.substring(err.message.indexOf('\n') + 1).replace('main.cpp: ','');
                endTime = new Date().getTime();
                res.status(400).json({
                    error: errorToSend,
                    timeToExecute: `${(endTime - startTime) / 1000}s`
                })
            } else {
                endTime = new Date().getTime();
                res.json({
                    output: stdout,
                    timeToExecute: `${(endTime - startTime) / 1000}s`
                })
            }

            // get time taken in seconds
            const timeTaken = (endTime - startTime) / 1000;

            // log time taken
            console.log(`Time taken: ${timeTaken} seconds`);
        }
    );
});


app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
    }
);