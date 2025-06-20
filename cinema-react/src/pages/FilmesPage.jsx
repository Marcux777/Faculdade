import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import { filmeService } from '../services/filmeService';
import useApi from '../hooks/useApi';
import FilmesTable from '../components/pages/filmes/FilmesTable';
import FilmesCatalogo from '../components/pages/filmes/FilmesCatalogo';
import FilmeForm from '../components/pages/filmes/FilmeForm';

const emptyFilme = {
  titulo: '',
  duracao: '',
  classificacao: '',
  genero: '',
  poster: null,
};

const FilmesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [filmeToEdit, setFilmeToEdit] = useState(null);
  const [filmeToDelete, setFilmeToDelete] = useState(null);
  const [toast, setToast] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' ou 'catalog'

  const {
    data: filmes,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
  } = useApi(filmeService);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const resetFormState = () => {
    setFilmeToEdit(null);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    resetFormState();
  };

  const handleSubmit = async (dataToSend, id) => {
    const action = id ? updateItem : createItem;
    const result = id
      ? await action(id, dataToSend)
      : await action(dataToSend);

    if (result.success) {
      setToast({
        message: `Filme ${id ? 'atualizado' : 'criado'} com sucesso!`,
        type: 'success',
      });
      handleModalClose();
    } else {
      setToast({ message: result.error || 'Erro desconhecido', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!filmeToDelete) return;
    const result = await deleteItem(filmeToDelete.id);

    if (result.success) {
      setToast({ message: 'Filme excluído com sucesso!', type: 'success' });
    } else {
      setToast({ message: result.error || 'Erro ao excluir filme', type: 'error' });
    }
    setDeleteModalOpen(false);
    setFilmeToDelete(null);
  };

  const openEditModal = (filme) => {
    setFilmeToEdit(filme);
    setModalOpen(true);
  };

  const openDeleteModal = (filme) => {
    setFilmeToDelete(filme);
    setDeleteModalOpen(true);
  };

  return (
    <div className="container py-4">
      {loading && <div className="alert alert-info">Carregando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Filmes</h1>
        <div className="d-flex gap-2">
          {/* Toggle de visualização */}
          <div className="btn-group" role="group">
            <Button
              variant={viewMode === 'table' ? 'primary' : 'outline-primary'}
              onClick={() => setViewMode('table')}
              title="Visualização em tabela"
            >
              <i className="bi bi-table"></i>
            </Button>
            <Button
              variant={viewMode === 'catalog' ? 'primary' : 'outline-primary'}
              onClick={() => setViewMode('catalog')}
              title="Visualização em catálogo"
            >
              <i className="bi bi-grid-3x3-gap"></i>
            </Button>
          </div>

          <Button onClick={() => setModalOpen(true)}>
            <i className="bi bi-plus-lg me-2"></i>
            Novo Filme
          </Button>
        </div>
      </div>

      {/* Renderização condicional baseada no modo de visualização */}
      {viewMode === 'table' ? (
        <FilmesTable filmes={filmes} onEdit={openEditModal} onDelete={openDeleteModal} />
      ) : (
        <FilmesCatalogo
          filmes={filmes}
          showActions={true}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirmar Exclusão"
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Excluir
            </Button>
          </>
        }
      >
        <p>
          Tem certeza que deseja excluir o filme{' '}
          <strong>{filmeToDelete?.titulo}</strong>?
        </p>
      </Modal>

      {/* Create/Edit Modal */}
      <Modal
        title={filmeToEdit ? 'Editar Filme' : 'Novo Filme'}
        isOpen={modalOpen}
        onClose={handleModalClose}
      >
        <FilmeForm
            onSubmit={handleSubmit}
            initialData={filmeToEdit || emptyFilme}
            onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default FilmesPage;
