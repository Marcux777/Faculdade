import Button from '../../common/Button';
import { format } from 'date-fns';

const SessoesTable = ({ sessoes, onEdit, onDelete }) => {
  if (!sessoes || sessoes.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-calendar-event fs-1 text-muted mb-3"></i>
        <h4 className="text-muted">Nenhuma sessão cadastrada</h4>
        <p className="text-muted">Clique em "Nova Sessão" para começar</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Filme</th>
            <th>Sala</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Valor do Ingresso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sessoes.map((sessao) => (
            <tr key={sessao.id}>
              <td>{sessao.filme?.titulo}</td>
              <td>Sala {sessao.sala?.numero} ({sessao.sala?.tipo})</td>
              <td>{format(new Date(sessao.data), 'dd/MM/yyyy')}</td>
              <td>{sessao.horario}</td>
              <td>R$ {Number(sessao.valorIngresso).toFixed(2)}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(sessao)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(sessao)}
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

export default SessoesTable;
