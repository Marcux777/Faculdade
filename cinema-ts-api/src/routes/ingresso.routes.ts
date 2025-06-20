import { Router } from 'express';
import IngressoController from '../controllers/ingresso.controller';

const ingressoRoutes = Router();

ingressoRoutes.post('/', IngressoController.create);
ingressoRoutes.get('/', IngressoController.findAll);
ingressoRoutes.get('/:id', IngressoController.findOne);
ingressoRoutes.put('/:id', IngressoController.update);
ingressoRoutes.delete('/:id', IngressoController.delete);

export default ingressoRoutes;
