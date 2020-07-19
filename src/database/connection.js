const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);// conexao de desenvolvimento la do knexfile.js

module.exports = connection; //conexao com o banco de dados