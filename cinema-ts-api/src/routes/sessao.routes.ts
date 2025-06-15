import { Router } from 'express';
import SessaoController from '../controllers/sessao.controller';

const sessaoRoutes = Router();

sessaoRoutes.post('/sessoes', SessaoController.create);
sessaoRoutes.get('/sessoes', SessaoController.findAll);
sessaoRoutes.get('/sessoes/:id', SessaoController.findOne);
sessaoRoutes.put('/sessoes/:id', SessaoController.update);
sessaoRoutes.delete('/sessoes/:id', SessaoController.delete);

export default sessaoRoutes; 