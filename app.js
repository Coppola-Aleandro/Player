const express = require('express');
const http = require('http');

const app = express();

const port = process.env.port || '3001';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log("running"));
