import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import { sessaoService } from '../services/sessaoService';
import { filmeService } from '../services/filmeService';
import { salaService } from '../services/salaService';
import useApi from '../hooks/useApi';
import { format } from 'date-fns';
import SessaoForm from '../components/pages/sessoes/SessaoForm';
import SessoesTable from '../components/pages/sessoes/SessoesTable';

const SessoesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sessaoToEdit, setSessaoToEdit] = useState(null);
  const [sessaoToDelete, setSessaoToDelete] = useState(null);
  const [toast, setToast] = useState(null);

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

  const resetFormState = () => {
    setSessaoToEdit(null);
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
      setToast({ message: `Sessão ${id ? 'atualizada' : 'criada'} com sucesso!`, type: 'success' });
      handleModalClose();
    } else {
      setToast({ message: result.error || 'Erro ao salvar sessão', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!sessaoToDelete) return;
    const result = await deleteItem(sessaoToDelete.id);

    if (result.success) {
      setToast({ message: 'Sessão excluída com sucesso!', type: 'success' });
    } else {
      setToast({ message: result.error || 'Erro ao excluir sessão', type: 'error' });
    }
    setDeleteModalOpen(false);
    setSessaoToDelete(null);
  };

  const openEditModal = (sessao) => {
    setSessaoToEdit(sessao);
    setModalOpen(true);
  };

  const openDeleteModal = (sessao) => {
    setSessaoToDelete(sessao);
    setDeleteModalOpen(true);
  };

  return (
    <div className="container py-4">
      {loading && <div className="alert alert-info">Carregando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Sessões</h1>
        <Button onClick={() => setModalOpen(true)}>
          <i className="bi bi-plus-lg me-2"></i>
          Nova Sessão
        </Button>
      </div>

      <SessoesTable sessoes={sessoes} onEdit={openEditModal} onDelete={openDeleteModal} />

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
          Tem certeza que deseja excluir a sessão do filme{' '}
          <strong>{sessaoToDelete?.filme?.titulo}</strong> na sala{' '}
          <strong>{sessaoToDelete?.sala?.numero}</strong>?
        </p>
      </Modal>

      {/* Create/Edit Modal */}
      <Modal
        title={sessaoToEdit ? 'Editar Sessão' : 'Nova Sessão'}
        isOpen={modalOpen}
        onClose={handleModalClose}
      >
        <SessaoForm
          onSubmit={handleSubmit}
          initialData={sessaoToEdit || {}}
          onCancel={handleModalClose}
          filmes={filmes}
          salas={salas}
        />
      </Modal>
    </div>
  );
};

export default SessoesPage;
