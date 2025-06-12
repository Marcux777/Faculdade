import { Router } from 'express';
import filmeController from '../controllers/filmeController';

const filmeRoutes = Router();

filmeRoutes.post('/filmes', filmeController.create);
filmeRoutes.get('/filmes/:id', filmeController.findById);
filmeRoutes.get('/filmes', filmeController.findAll);
filmeRoutes.put('/filmes/:id', filmeController.update);
filmeRoutes.delete('/filmes/:id', filmeController.delete);

export default filmeRoutes;
