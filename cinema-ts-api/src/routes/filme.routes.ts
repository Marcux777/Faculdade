import { Router } from 'express';
import FilmeController from '../controllers/filme.controller';

const filmeRoutes = Router();

filmeRoutes.post('/filmes', FilmeController.create);
filmeRoutes.get('/filmes', FilmeController.findAll);
filmeRoutes.get('/filmes/:id', FilmeController.findOne);
filmeRoutes.put('/filmes/:id', FilmeController.update);
filmeRoutes.delete('/filmes/:id', FilmeController.delete);

export default filmeRoutes; 