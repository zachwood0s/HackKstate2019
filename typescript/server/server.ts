/* app/server.ts */

import express from 'express';
import {PageController} from './pages';
import * as http from 'http';
import {sockets} from './sockets';
import * as socketIo from 'socket.io'; 


// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
app.use(express.static(__dirname + '../../../../'));
const port: number = 3000;

const server = http.createServer(app);
const io = require('socket.io')(server);

// Mount the WelcomeController at the /welcome route
app.use('/', PageController);

// Serve the application at the given port
server.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});

sockets(io);

export{port}