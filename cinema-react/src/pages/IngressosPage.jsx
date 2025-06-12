import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import { ingressoService } from '../services/ingressoService';
import { sessaoService } from '../services/sessaoService';
import useApi from '../hooks/useApi';
import { format } from 'date-fns';

const IngressosPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    sessaoId: '',
    quantidade: 1,
    tipoIngresso: 'INTEIRA',
  });

  const {
    data: ingressos,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem
  } = useApi(ingressoService);

  const { data: sessoes, fetchData: fetchSessoes } = useApi(sessaoService);

  useEffect(() => {
    fetchData();
    fetchSessoes();
  }, [fetchData, fetchSessoes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = formData.id ? updateItem : createItem;
    const result = formData.id ? await action(formData.id, formData) : await action(formData);

    if (result.success) {
      setToast({ message: `Ingresso ${formData.id ? 'atualizado' : 'comprado'} com sucesso!`, type: 'success' });
      setModalOpen(false);
      setFormData({ sessaoId: '', quantidade: 1, tipoIngresso: 'INTEIRA' });
    } else {
      setToast({ message: result.error || 'Erro ao salvar ingresso', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja cancelar este ingresso?')) {
      const result = await deleteItem(id);
      if (result.success) {
        setToast({ message: 'Ingresso cancelado com sucesso!', type: 'success' });
      } else {
        setToast({ message: result.error || 'Erro ao cancelar ingresso', type: 'error' });
      }
    }
  };

  const handleEdit = (ingresso) => {
    setFormData({
      ...ingresso,
      sessaoId: ingresso.sessao.id,
    });
    setModalOpen(true);
  };

  const openModal = () => {
    setFormData({ sessaoId: '', quantidade: 1, tipoIngresso: 'INTEIRA' });
    setModalOpen(true);
  }

  return (
    <div className="container py-4">
      {loading && <div className="alert alert-info">Carregando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Ingressos</h1>
        <Button onClick={openModal}>
          <i className="bi bi-plus-lg me-2"></i>
          Novo Ingresso
        </Button>
      </div>

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
                  {ingresso.sessao?.data ? format(new Date(ingresso.sessao.data), 'dd/MM/yyyy') : ''} - {ingresso.sessao?.horario}
                </td>
                <td>{ingresso.quantidade}</td>
                <td>{ingresso.tipoIngresso}</td>
                <td>R$ {Number(ingresso.valorTotal).toFixed(2)}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(ingresso)}>
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(ingresso.id)}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <Modal
        title={formData.id ? 'Editar Ingresso' : 'Novo Ingresso'}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {formData.id ? 'Atualizar' : 'Comprar Ingresso'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="sessaoId" className="form-label">Sessão</label>
            <select
              id="sessaoId"
              name="sessaoId"
              className="form-select"
              value={formData.sessaoId}
              onChange={(e) => setFormData({ ...formData, sessaoId: e.target.value })}
              required
              disabled={!!formData.id}
            >
              <option value="">Selecione uma sessão...</option>
              {sessoes.map(sessao => (
                <option key={sessao.id} value={sessao.id}>
                  {sessao.filme?.titulo} - Sala {sessao.sala?.numero} -
                  {sessao.data ? format(new Date(sessao.data), 'dd/MM/yyyy') : ''} - {sessao.horario}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Quantidade"
            id="quantidade"
            name="quantidade"
            type="number"
            min="1"
            value={formData.quantidade}
            onChange={(e) => setFormData({ ...formData, quantidade: parseInt(e.target.value) || 1 })}
            required
          />

          <div className="mb-3">
            <label htmlFor="tipoIngresso" className="form-label">Tipo de Ingresso</label>
            <select
              id="tipoIngresso"
              name="tipoIngresso"
              className="form-select"
              value={formData.tipoIngresso}
              onChange={(e) => setFormData({ ...formData, tipoIngresso: e.target.value })}
              required
            >
              <option value="INTEIRA">Inteira</option>
              <option value="MEIA">Meia-Entrada</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default IngressosPage;
