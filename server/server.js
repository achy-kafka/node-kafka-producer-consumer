import express from 'express';
import printTable from '../consumer/ktable.js';
import { io } from 'socket.io-client';



const app = express();
const PORT = 3000;
const socket = io("http://localhost:5000");
socket.on("consumerMessage", data => {
  console.log('data received on pretend client server', data);
});

// handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve home page
app.get('/', (req, res) => res.status(200).send('Home Page'));
app.get('/table', printTable, (req, res) => {
  res.status(200).json(res.locals.table);
});

// app.get('/stream', printStream, (req, res) => {
//   res.status(200).json(res.locals.msgs);
// });
// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

