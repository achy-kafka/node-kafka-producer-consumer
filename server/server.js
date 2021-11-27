import express from 'express';
import funcs from '../consumer/ktable.js';
// import printStream from '../consumer/index.js';

const app = express();
const PORT = 3000;

// handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve home page
app.get('/', (req, res) => res.status(200).send('Home Page'));
app.get('/table1', funcs.printTable1, (req, res) => {
  res.status(200).json(res.locals.table);
});
app.get('/table2', funcs.printTable2, (req, res) => {
  res.status(200).json(res.locals.table);
});

// app.get('/stream', printStream, (req, res) => {
//   res.status(200).json(res.locals.msgs);
// });
// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
