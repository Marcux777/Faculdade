import 'express-async-errors'; // Must be the first import
import express from 'express';
import cors from 'cors';
import routes from './routes'; // Importa o index.ts da pasta routes
import path from 'path';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes); // Prefixa todas as rotas com /api
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errorHandler); // Error handler must be the last middleware

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
