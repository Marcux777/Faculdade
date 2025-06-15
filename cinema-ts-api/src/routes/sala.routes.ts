import { Router } from 'express';
import SalaController from '../controllers/sala.controller';

const salaRoutes = Router();

salaRoutes.post('/salas', SalaController.create);
salaRoutes.get('/salas', SalaController.findAll);
salaRoutes.get('/salas/:id', SalaController.findOne);
salaRoutes.put('/salas/:id', SalaController.update);
salaRoutes.delete('/salas/:id', SalaController.delete);

export default salaRoutes; 