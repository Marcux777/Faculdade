import Button from '../../common/Button';

const FilmesTable = ({ filmes, onEdit, onDelete }) => {
  if (!filmes || filmes.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-film fs-1 text-muted mb-3"></i>
        <h4 className="text-muted">Nenhum filme cadastrado</h4>
        <p className="text-muted">Clique em "Novo Filme" para começar</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th style={{ width: '120px' }}>Banner</th>
            <th>Título</th>
            <th>Duração</th>
            <th>Classificação</th>
            <th>Gênero</th>
            <th style={{ width: '120px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filmes.map((filme) => (
            <tr key={filme.id}>
              <td>
                <div style={{ width: '80px', height: '120px' }} className="d-flex align-items-center justify-content-center">
                  {filme.poster ? (
                    <img
                      src={`/api/uploads/${filme.poster}`}
                      alt={filme.titulo}
                      style={{
                        width: '80px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #ddd'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '80px',
                        height: '120px',
                        backgroundColor: '#f8f9fa',
                        border: '2px dashed #dee2e6',
                        borderRadius: '8px'
                      }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <i className="bi bi-image text-muted fs-3"></i>
                    </div>
                  )}
                </div>
              </td>
              <td>
                <strong>{filme.titulo}</strong>
              </td>
              <td>{filme.duracao} min</td>
              <td>
                <span className="badge bg-secondary">{filme.classificacao}</span>
              </td>
              <td>
                <span className="badge bg-primary">{filme.genero}</span>
              </td>
              <td>
                <div className="d-flex gap-1">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => onEdit(filme)}
                    title="Editar filme"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(filme)}
                    title="Excluir filme"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilmesTable;
