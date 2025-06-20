import Button from '../../common/Button';

const FilmesCatalogo = ({ filmes, onSelectFilme, showActions = false, onEdit, onDelete }) => {
  if (!filmes || filmes.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-film fs-1 text-muted mb-3"></i>
        <h4 className="text-muted">Nenhum filme disponível</h4>
        <p className="text-muted">Não há filmes cadastrados no momento</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {filmes.map((filme) => (
        <div key={filme.id} className="col-md-6 col-lg-4 col-xl-3">
          <div className="card h-100 shadow-sm">
            {/* Banner do filme */}
            <div style={{ height: '300px', overflow: 'hidden' }}>
              {filme.poster ? (
                <img
                  src={`/api/uploads/${filme.poster}`}
                  alt={filme.titulo}
                  className="card-img-top"
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div
                  className="card-img-top d-flex align-items-center justify-content-center"
                  style={{
                    height: '300px',
                    backgroundColor: '#f8f9fa',
                    border: '2px dashed #dee2e6'
                  }}
                >
                  <div className="text-center">
                    <i className="bi bi-image text-muted" style={{ fontSize: '3rem' }}></i>
                    <p className="text-muted mt-2 mb-0">Sem banner</p>
                  </div>
                </div>
              )}
            </div>

            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{filme.titulo}</h5>

              <div className="mb-2">
                <small className="text-muted">
                  <i className="bi bi-clock me-1"></i>
                  {filme.duracao} min
                </small>
              </div>

              <div className="mb-2">
                <span className="badge bg-secondary me-2">{filme.classificacao}</span>
                <span className="badge bg-primary">{filme.genero}</span>
              </div>

              {/* Ações */}
              <div className="mt-auto">
                {onSelectFilme && (
                  <Button
                    variant="primary"
                    className="w-100 mb-2"
                    onClick={() => onSelectFilme(filme)}
                  >
                    <i className="bi bi-play-circle me-2"></i>
                    Selecionar
                  </Button>
                )}

                {showActions && (
                  <div className="d-flex gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      className="flex-fill"
                      onClick={() => onEdit && onEdit(filme)}
                      title="Editar filme"
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="flex-fill"
                      onClick={() => onDelete && onDelete(filme)}
                      title="Excluir filme"
                    >
                      <i className="bi bi-trash me-1"></i>
                      Excluir
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilmesCatalogo;
