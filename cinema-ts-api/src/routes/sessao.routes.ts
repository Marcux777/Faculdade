import { Router } from 'express';
import SessaoController from '../controllers/sessao.controller';

const sessaoRoutes = Router();

sessaoRoutes.post('/', SessaoController.create);
sessaoRoutes.get('/', SessaoController.findAll);
sessaoRoutes.get('/:id', SessaoController.findOne);
sessaoRoutes.put('/:id', SessaoController.update);
sessaoRoutes.delete('/:id', SessaoController.delete);

export default sessaoRoutes;
