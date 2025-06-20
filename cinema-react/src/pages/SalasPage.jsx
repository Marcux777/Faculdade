import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import { salaService } from '../services/salaService';
import useApi from '../hooks/useApi';
import SalaForm from '../components/pages/salas/SalaForm';
import SalasTable from '../components/pages/salas/SalasTable';

const SalasPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [salaToEdit, setSalaToEdit] = useState(null);
  const [salaToDelete, setSalaToDelete] = useState(null);
  const [toast, setToast] = useState(null);

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

  const resetFormState = () => {
    setSalaToEdit(null);
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
      setToast({ message: `Sala ${id ? 'atualizada' : 'criada'} com sucesso!`, type: 'success' });
      handleModalClose();
    } else {
      setToast({ message: result.error || 'Erro ao salvar sala', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!salaToDelete) return;

    const result = await deleteItem(salaToDelete.id);
    if (result.success) {
      setToast({ message: 'Sala excluída com sucesso!', type: 'success' });
    } else {
      setToast({ message: result.error || 'Erro ao excluir sala', type: 'error' });
    }
    setDeleteModalOpen(false);
    setSalaToDelete(null);
  };

  const openEditModal = (sala) => {
    setSalaToEdit(sala);
    setModalOpen(true);
  };

  const openDeleteModal = (sala) => {
    setSalaToDelete(sala);
    setDeleteModalOpen(true);
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

      <SalasTable salas={salas} onEdit={openEditModal} onDelete={openDeleteModal} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

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
            Tem certeza que deseja excluir a sala <strong>{salaToDelete?.numero}</strong>?
        </p>
      </Modal>

      {/* Create/Edit Modal */}
      <Modal
        title={salaToEdit ? 'Editar Sala' : 'Nova Sala'}
        isOpen={modalOpen}
        onClose={handleModalClose}
      >
        <SalaForm
            onSubmit={handleSubmit}
            initialData={salaToEdit || {}}
            onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default SalasPage;
