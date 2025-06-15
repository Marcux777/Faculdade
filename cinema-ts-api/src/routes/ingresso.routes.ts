import { Router } from 'express';
import IngressoController from '../controllers/ingresso.controller';

const ingressoRoutes = Router();

ingressoRoutes.post('/ingressos', IngressoController.create);
ingressoRoutes.get('/ingressos', IngressoController.findAll);
ingressoRoutes.get('/ingressos/:id', IngressoController.findOne);
ingressoRoutes.put('/ingressos/:id', IngressoController.update);
ingressoRoutes.delete('/ingressos/:id', IngressoController.delete);

export default ingressoRoutes; 