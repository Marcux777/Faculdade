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
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/filmes">
                Filmes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/salas">
                Salas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sessoes">
                Sessões
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ingressos">
                Ingressos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
