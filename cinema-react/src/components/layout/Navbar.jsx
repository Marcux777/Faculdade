import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-film me-2"></i>
          Cinema
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/filmes-disponiveis">
                <i className="bi bi-collection-play me-1"></i>
                Catálogo
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-gear me-1"></i>
                Administração
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/filmes">
                    <i className="bi bi-film me-2"></i>
                    Gerenciar Filmes
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/salas">
                    <i className="bi bi-building me-2"></i>
                    Gerenciar Salas
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/sessoes">
                    <i className="bi bi-calendar-event me-2"></i>
                    Gerenciar Sessões
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/ingressos">
                    <i className="bi bi-ticket-perforated me-2"></i>
                    Gerenciar Ingressos
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
