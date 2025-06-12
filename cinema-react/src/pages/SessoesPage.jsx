import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import { sessaoService } from '../services/sessaoService';
import { filmeService } from '../services/filmeService';
import { salaService } from '../services/salaService';
import useApi from '../hooks/useApi';
import { format } from 'date-fns';

const SessoesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    filmeId: '',
    salaId: '',
    data: '',
    horario: '',
    valorIngresso: ''
  });

  const {
    data: sessoes,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem
  } = useApi(sessaoService);

  const { data: filmes, fetchData: fetchFilmes } = useApi(filmeService);
  const { data: salas, fetchData: fetchSalas } = useApi(salaService);

  useEffect(() => {
    fetchData();
    fetchFilmes();
    fetchSalas();
  }, [fetchData, fetchFilmes, fetchSalas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = formData.id ? updateItem : createItem;
    const result = formData.id ? await action(formData.id, formData) : await action(formData);

    if (result.success) {
      setToast({ message: `Sessão ${formData.id ? 'atualizada' : 'criada'} com sucesso!`, type: 'success' });
      setModalOpen(false);
      setFormData({ filmeId: '', salaId: '', data: '', horario: '', valorIngresso: '' });
    } else {
      setToast({ message: result.error || 'Erro ao salvar sessão', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta sessão?')) {
      const result = await deleteItem(id);
      if (result.success) {
        setToast({ message: 'Sessão excluída com sucesso!', type: 'success' });
      } else {
        setToast({ message: result.error || 'Erro ao excluir sessão', type: 'error' });
      }
    }
  };

  const handleEdit = (sessao) => {
    setFormData({
      ...sessao,
      filmeId: sessao.filme.id,
      salaId: sessao.sala.id,
      data: format(new Date(sessao.data), 'yyyy-MM-dd')
    });
    setModalOpen(true);
  };

  const openModal = () => {
    setFormData({ filmeId: '', salaId: '', data: '', horario: '', valorIngresso: '' });
    setModalOpen(true);
  };

  return (
    <div className="container py-4">
      {loading && <div className="alert alert-info">Carregando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Sessões</h1>
        <Button onClick={openModal}>
          <i className="bi bi-plus-lg me-2"></i>
          Nova Sessão
        </Button>
      </div>

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
                <td>Sala {sessao.sala?.numero}</td>
                <td>{format(new Date(sessao.data), 'dd/MM/yyyy')}</td>
                <td>{sessao.horario}</td>
                <td>R$ {Number(sessao.valorIngresso).toFixed(2)}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(sessao)}>
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(sessao.id)}>
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
        title={formData.id ? 'Editar Sessão' : 'Nova Sessão'}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {formData.id ? 'Atualizar' : 'Salvar'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="filmeId" className="form-label">Filme</label>
            <select
              id="filmeId"
              name="filmeId"
              className="form-select"
              value={formData.filmeId}
              onChange={(e) => setFormData({ ...formData, filmeId: e.target.value })}
              required
            >
              <option value="">Selecione um filme...</option>
              {filmes.map(filme => (
                <option key={filme.id} value={filme.id}>
                  {filme.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="salaId" className="form-label">Sala</label>
            <select
              id="salaId"
              name="salaId"
              className="form-select"
              value={formData.salaId}
              onChange={(e) => setFormData({ ...formData, salaId: e.target.value })}
              required
            >
              <option value="">Selecione uma sala...</option>
              {salas.map(sala => (
                <option key={sala.id} value={sala.id}>
                  Sala {sala.numero} - {sala.tipo}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Data"
            id="data"
            name="data"
            type="date"
            value={formData.data}
            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            required
          />

          <Input
            label="Horário"
            id="horario"
            name="horario"
            type="time"
            value={formData.horario}
            onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
            required
          />

          <Input
            label="Valor do Ingresso"
            id="valorIngresso"
            name="valorIngresso"
            type="number"
            step="0.01"
            min="0"
            value={formData.valorIngresso}
            onChange={(e) => setFormData({ ...formData, valorIngresso: e.target.value })}
            required
          />
        </form>
      </Modal>
    </div>
  );
};

export default SessoesPage;
