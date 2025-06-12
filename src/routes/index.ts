import { Router } from 'express';
import filmeRoutes from './filme.routes';
import salaRoutes from './sala.routes';
import sessaoRoutes from './sessao.routes';
import ingressoRoutes from './ingresso.routes';

const router = Router();

router.use(filmeRoutes);
router.use(salaRoutes);
router.use(sessaoRoutes);
router.use(ingressoRoutes);
// AQUI ENTRARÃO AS OUTRAS ROTAS (INGRESSO)

export default router;
