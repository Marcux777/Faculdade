import { Router } from 'express';
import salaController from '../controllers/salaController';

const salaRoutes = Router();

salaRoutes.post('/salas', salaController.create);
salaRoutes.get('/salas/:id', salaController.findById);
salaRoutes.get('/salas', salaController.findAll);
salaRoutes.put('/salas/:id', salaController.update);
salaRoutes.delete('/salas/:id', salaController.delete);

export default salaRoutes;
