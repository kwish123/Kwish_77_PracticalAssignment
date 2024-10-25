
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            fs.readFile('index.html', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading index.html');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else {
            const filePath = path.join(__dirname, req.url);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('File not found');
                } else {
                    res.writeHead(200);
                    res.end(data);
                }
            });
        }
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log('Received POST data:', body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data received' }));
        });
    }
});
server.on('request', (req, res) => {
    if (req.method === 'GET' && req.url === '/gethello') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello NodeJS!!');
    }
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
