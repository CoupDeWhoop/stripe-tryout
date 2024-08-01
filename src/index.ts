import express from 'express';
import http from 'http';
import getAllUsers from './routes/getAllUsers';

const app = express();
// Create an HTTP server and pass the Express app as the request handler
const server = new http.Server(app);
server.listen(3002, () => {
  console.log('Listening on port 3002');
});

app.get('/users/all', getAllUsers);
