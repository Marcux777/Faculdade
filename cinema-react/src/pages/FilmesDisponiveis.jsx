import { useState, useEffect } from 'react';
import { filmeService } from '../services/filmeService';
import useApi from '../hooks/useApi';
import FilmesCatalogo from '../components/pages/filmes/FilmesCatalogo';
import Input from '../components/common/Input';

const FilmesDisponiveis = () => {
  const [filtroGenero, setFiltroGenero] = useState('');
  const [filtroBusca, setFiltroBusca] = useState('');
  const [filmesVisitados, setFilmesVisitados] = useState(new Set());

  const {
    data: filmes,
    loading,
    error,
    fetchData,
  } = useApi(filmeService);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filtrar filmes baseado nos critérios
  const filmesFiltrados = filmes.filter(filme => {
    const matchGenero = !filtroGenero || filme.genero.toLowerCase().includes(filtroGenero.toLowerCase());
    const matchBusca = !filtroBusca || filme.titulo.toLowerCase().includes(filtroBusca.toLowerCase());
    return matchGenero && matchBusca;
  });

  // Obter gêneros únicos para o filtro
  const generosUnicos = [...new Set(filmes.map(filme => filme.genero))];

  const handleSelectFilme = (filme) => {
    // Marcar filme como visitado
    setFilmesVisitados(prev => new Set([...prev, filme.id]));

    // Aqui você pode adicionar lógica para mostrar detalhes do filme
    // Por exemplo, abrir um modal com informações detalhadas
    console.log('Filme selecionado:', filme);
  };

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="text-center mb-4">
            <i className="bi bi-film me-2"></i>
            Filmes Disponíveis
          </h1>

          {/* Filtros */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <Input
                label="Buscar filme"
                id="busca"
                name="busca"
                placeholder="Digite o nome do filme..."
                value={filtroBusca}
                onChange={(e) => setFiltroBusca(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="genero" className="form-label">Filtrar por gênero</label>
              <select
                id="genero"
                className="form-select"
                value={filtroGenero}
                onChange={(e) => setFiltroGenero(e.target.value)}
              >
                <option value="">Todos os gêneros</option>
                {generosUnicos.map(genero => (
                  <option key={genero} value={genero}>{genero}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="row text-center mb-4">
            <div className="col-md-4">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <h5 className="card-title">{filmes.length}</h5>
                  <p className="card-text">Total de Filmes</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <h5 className="card-title">{filmesFiltrados.length}</h5>
                  <p className="card-text">Filmes Filtrados</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <h5 className="card-title">{generosUnicos.length}</h5>
                  <p className="card-text">Gêneros Disponíveis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-2">Carregando filmes...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {!loading && !error && (
        <FilmesCatalogo
          filmes={filmesFiltrados}
          onSelectFilme={handleSelectFilme}
          showActions={false}
        />
      )}
    </div>
  );
};

export default FilmesDisponiveis;
