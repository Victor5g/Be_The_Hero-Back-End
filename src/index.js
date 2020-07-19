const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // informa para o express que todas as requisicaes estao sendo em JSON
app.use(routes);

app.listen(3333);

