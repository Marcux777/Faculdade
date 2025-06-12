import { Router } from 'express';
import sessaoController from '../controllers/sessaoController';

const sessaoRoutes = Router();

sessaoRoutes.post('/sessoes', sessaoController.create);
sessaoRoutes.get('/sessoes/:id', sessaoController.findById);
sessaoRoutes.get('/sessoes', sessaoController.findAll);
sessaoRoutes.put('/sessoes/:id', sessaoController.update);
sessaoRoutes.delete('/sessoes/:id', sessaoController.delete);

export default sessaoRoutes;
