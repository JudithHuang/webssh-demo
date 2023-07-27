const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

import { createNewServer } from './utils/createNewServer';


app.get('/', function (req: any, res: any, next: any) {
  res.end();
});

app.ws('/', function (ws: any, req: any) {
  createNewServer({
    host: '121.199.69.142',
    username: 'root',
    password: 'Stack@80'
  }, ws)
});

app.listen(3001)
