import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import FilmesPage from './pages/FilmesPage';
import FilmesDisponiveis from './pages/FilmesDisponiveis';
import SalasPage from './pages/SalasPage';
import SessoesPage from './pages/SessoesPage';
import IngressosPage from './pages/IngressosPage';

// Importar estilos do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/filmes" element={<FilmesPage />} />
            <Route path="/filmes-disponiveis" element={<FilmesDisponiveis />} />
            <Route path="/salas" element={<SalasPage />} />
            <Route path="/sessoes" element={<SessoesPage />} />
            <Route path="/ingressos" element={<IngressosPage />} />
            <Route path="/" element={<FilmesDisponiveis />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
