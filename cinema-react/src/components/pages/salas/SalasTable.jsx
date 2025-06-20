import Button from '../../common/Button';

const SalasTable = ({ salas, onEdit, onDelete }) => {
  if (!salas || salas.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-building fs-1 text-muted mb-3"></i>
        <h4 className="text-muted">Nenhuma sala cadastrada</h4>
        <p className="text-muted">Clique em "Nova Sala" para começar</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Capacidade</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {salas.map((sala) => (
            <tr key={sala.id}>
              <td>{sala.numero}</td>
              <td>{sala.capacidade}</td>
              <td>{sala.tipo}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(sala)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(sala)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalasTable;
