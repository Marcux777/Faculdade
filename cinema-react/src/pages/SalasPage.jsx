import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import { salaService } from '../services/salaService';
import useApi from '../hooks/useApi';

const SalasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    numero: '',
    capacidade: '',
    tipo: ''
  });

  const {
    data: salas,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem
  } = useApi(salaService);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = formData.id ? updateItem : createItem;
    const result = formData.id ? await action(formData.id, formData) : await action(formData);

    if (result.success) {
      setToast({ message: `Sala ${formData.id ? 'atualizada' : 'criada'} com sucesso!`, type: 'success' });
      setModalOpen(false);
      setFormData({ numero: '', capacidade: '', tipo: '' });
    } else {
      setToast({ message: result.error || 'Erro ao salvar sala', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta sala?')) {
      const result = await deleteItem(id);
      if (result.success) {
        setToast({ message: 'Sala excluída com sucesso!', type: 'success' });
      } else {
        setToast({ message: result.error || 'Erro ao excluir sala', type: 'error' });
      }
    }
  };

  const handleEdit = (sala) => {
    setFormData(sala);
    setModalOpen(true);
  };

  return (
    <div className="container py-4">
      {loading && <div className="alert alert-info">Carregando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Salas</h1>
        <Button onClick={() => setModalOpen(true)}>
          <i className="bi bi-plus-lg me-2"></i>
          Nova Sala
        </Button>
      </div>

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
                    onClick={() => handleEdit(sala)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(sala.id)}
                  >
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
        title={formData.id ? 'Editar Sala' : 'Nova Sala'}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setFormData({ numero: '', capacidade: '', tipo: '' });
        }}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setModalOpen(false);
                setFormData({ numero: '', capacidade: '', tipo: '' });
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {formData.id ? 'Atualizar' : 'Salvar'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Número"
            id="numero"
            name="numero"
            type="number"
            value={formData.numero}
            onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
            required
          />
          <Input
            label="Capacidade"
            id="capacidade"
            name="capacidade"
            type="number"
            value={formData.capacidade}
            onChange={(e) => setFormData({ ...formData, capacidade: e.target.value })}
            required
          />
          <div className="mb-3">
            <label htmlFor="tipo" className="form-label">Tipo</label>
            <select
              id="tipo"
              name="tipo"
              className="form-select"
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              required
            >
              <option value="">Selecione...</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SalasPage;
