import { Router } from 'express';
import SalaController from '../controllers/sala.controller';

const salaRoutes = Router();

salaRoutes.post('/', SalaController.create);
salaRoutes.get('/', SalaController.findAll);
salaRoutes.get('/:id', SalaController.findOne);
salaRoutes.put('/:id', SalaController.update);
salaRoutes.delete('/:id', SalaController.delete);

export default salaRoutes;
