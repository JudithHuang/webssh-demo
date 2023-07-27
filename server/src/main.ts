const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

import { createNewServer } from './utils/createNewServer';


app.get('/', function (req: any, res: any, next: any) {
  res.end();
});

app.ws('/', function (ws: any, req: any) {
  createNewServer({
    host: '127.0.0.1',
    username: 'root',
    password: '123456'
  }, ws)
});

app.listen(3001)
