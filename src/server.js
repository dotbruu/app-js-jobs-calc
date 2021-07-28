const express = require('express');
const routes = require('./routes');
const path = require('path');

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.resolve(__dirname, 'views'));

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

server.use(routes);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Project run in http://localhost:${port}`);
});
