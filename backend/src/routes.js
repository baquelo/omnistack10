const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query Params (GET): Ex.: http://localhost:3333/users?search=Marcelo
// request.query (Filtros, ordenação, paginação, ...)

// Route Params (PUT, DELETE): EX.: http://localhost:3333/users/1
// request.params (Identificar um recurso na alteração ou remoção)

// Body (POST, PUT):
// request.body (Dados para criação ou alteração de um registro) 

// MongoDB (Não-relacional)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;