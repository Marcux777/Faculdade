import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import { filmeService } from '../services/filmeService';
import useApi from '../hooks/useApi';

const FilmesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    duracao: '',
    classificacao: '',
    genero: ''
  });

  const {
    data: filmes,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem
  } = useApi(filmeService);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = formData.id ? updateItem : createItem;
    const result = formData.id ? await action(formData.id, formData) : await action(formData);

    if (result.success) {
      setToast({ message: `Filme ${formData.id ? 'atualizado' : 'criado'} com sucesso!`, type: 'success' });
      setModalOpen(false);
      setFormData({ titulo: '', duracao: '', classificacao: '', genero: '' });
    } else {
      setToast({ message: result.error || 'Erro ao criar filme', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este filme?')) {
      const result = await deleteItem(id);
      if (result.success) {
        setToast({ message: 'Filme excluído com sucesso!', type: 'success' });
      } else {
        setToast({ message: result.error || 'Erro ao excluir filme', type: 'error' });
      }
    }
  };

  const handleEdit = async (filme) => {
    setFormData(filme);
    setModalOpen(true);
  };

  return (
    <div className="container py-4">
      {loading && (
        <div className="alert alert-info">Carregando...</div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Filmes</h1>
        <Button onClick={() => setModalOpen(true)}>
          <i className="bi bi-plus-lg me-2"></i>
          Novo Filme
        </Button>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Duração</th>
              <th>Classificação</th>
              <th>Gênero</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filmes.map((filme) => (
              <tr key={filme.id}>
                <td>{filme.titulo}</td>
                <td>{filme.duracao}</td>
                <td>{filme.classificacao}</td>
                <td>{filme.genero}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(filme)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(filme.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Modal
        title={formData.id ? 'Editar Filme' : 'Novo Filme'}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setFormData({ titulo: '', duracao: '', classificacao: '', genero: '' });
        }}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setModalOpen(false);
                setFormData({ titulo: '', duracao: '', classificacao: '', genero: '' });
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
            label="Título"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            required
          />
          <Input
            label="Duração (minutos)"
            id="duracao"
            name="duracao"
            type="number"
            value={formData.duracao}
            onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
            required
          />
          <Input
            label="Classificação"
            id="classificacao"
            name="classificacao"
            value={formData.classificacao}
            onChange={(e) => setFormData({ ...formData, classificacao: e.target.value })}
            required
          />
          <Input
            label="Gênero"
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
            required
          />
        </form>
      </Modal>
    </div>
  );
};

export default FilmesPage;
