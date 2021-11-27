const express = require ('express');
const { io } = require ('socket.io-client');
const fs = require ('fs');
const path = require ('path');


const app = express();
const PORT = 3000;
const socket = io("http://localhost:5000");
socket.on("consumerMessage", data => {
  console.log('data received on pretend client server', data);
});

// handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware 
const printTable = (req, res, next) => {
  const table = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../consumer/ktable.json'), 'UTF-8'));
  res.locals.table = table;
  return next();
  }

// serve home page
app.get('/', (req, res) => res.status(200).send('Home Page'));

// serve latest table
app.get('/table', printTable, (req, res) => {
  res.status(200).json(res.locals.table);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

