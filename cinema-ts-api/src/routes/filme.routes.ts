import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import FilmeController from '../controllers/filme.controller';

const filmeRoutes = Router();
const upload = multer(uploadConfig);

filmeRoutes.get('/', FilmeController.listar);
filmeRoutes.get('/:id', FilmeController.obter);
filmeRoutes.post('/', upload.single('poster'), FilmeController.criar);
filmeRoutes.put('/:id', upload.single('poster'), FilmeController.atualizar);
filmeRoutes.delete('/:id', FilmeController.deletar);

export default filmeRoutes;
