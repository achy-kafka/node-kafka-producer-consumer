import express from 'express';
import printTable from '../consumer/ktable.js';
import printStream from '../consumer/index.js';

const app = express();
const PORT = 3000;

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

