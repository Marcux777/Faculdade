import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import filmeRoutes from './routes/filme.routes';
import salaRoutes from './routes/sala.routes';
import sessaoRoutes from './routes/sessao.routes';
import ingressoRoutes from './routes/ingresso.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', filmeRoutes);
app.use('/api', salaRoutes);
app.use('/api', sessaoRoutes);
app.use('/api', ingressoRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
