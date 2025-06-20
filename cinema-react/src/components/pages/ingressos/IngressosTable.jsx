import Button from '../../common/Button';
import { format } from 'date-fns';

const IngressosTable = ({ ingressos, onEdit, onDelete }) => {
  if (!ingressos || ingressos.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-ticket-perforated fs-1 text-muted mb-3"></i>
        <h4 className="text-muted">Nenhum ingresso cadastrado</h4>
        <p className="text-muted">Clique em "Novo Ingresso" para começar</p>
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
            <th>Sessão</th>
            <th>Quantidade</th>
            <th>Tipo</th>
            <th>Valor Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ingressos.map((ingresso) => (
            <tr key={ingresso.id}>
              <td>{ingresso.sessao?.filme?.titulo}</td>
              <td>Sala {ingresso.sessao?.sala?.numero}</td>
              <td>
                {ingresso.sessao?.data && ingresso.sessao?.horario
                  ? `${format(new Date(ingresso.sessao.data), 'dd/MM/yyyy')} ${ingresso.sessao.horario}`
                  : 'Data inválida'}
              </td>
              <td>{ingresso.quantidade}</td>
              <td>{ingresso.tipoIngresso}</td>
              <td>R$ {Number(ingresso.valorTotal).toFixed(2)}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(ingresso)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(ingresso)}
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

export default IngressosTable;
