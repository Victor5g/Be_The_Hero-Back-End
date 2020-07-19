const express = require('express');// importando o express
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionConttroller = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs',OngController.index);//lista as ongs, vem la dos controllers
routes.get('/incidents',IncidentController.list);//lista incidentes, vem dos controlers
routes.get('/profile',ProfileController.index);//lista todos os casos de uma unica ong

routes.post('/sessions',SessionConttroller.create)//Realizar login;
routes.post('/ongs' ,OngController.create);// cria onges no banco, vem la dos controllers
routes.post('/incidents',IncidentController.create);//cria incidents, vem dos controlers

routes.delete('/incidents/:id',IncidentController.delete);

module.exports = routes;
    