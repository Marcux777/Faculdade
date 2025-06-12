import { Router } from 'express';
import ingressoController from '../controllers/ingressoController';

const ingressoRoutes = Router();

ingressoRoutes.post('/ingressos', ingressoController.create);
ingressoRoutes.get('/ingressos/:id', ingressoController.findById);
ingressoRoutes.get('/ingressos', ingressoController.findAll);
ingressoRoutes.put('/ingressos/:id', ingressoController.update);
ingressoRoutes.delete('/ingressos/:id', ingressoController.delete);

export default ingressoRoutes;
