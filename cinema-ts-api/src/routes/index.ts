import { Router } from 'express';
import filmeRoutes from './filme.routes';
import salaRoutes from './sala.routes';
import sessaoRoutes from './sessao.routes';
import ingressoRoutes from './ingresso.routes';

const router = Router();

// Rota para Health Check
router.get('/health', (req, res) => {
  return res.status(200).json({ status: 'UP' });
});

router.use('/filmes', filmeRoutes);
router.use('/salas', salaRoutes);
router.use('/sessoes', sessaoRoutes);
router.use('/ingressos', ingressoRoutes);

export default router;
