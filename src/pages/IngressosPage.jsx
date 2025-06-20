import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import { ingressoService } from '../services/ingressoService';
import { sessaoService } from '../services/sessaoService';
import useApi from '../hooks/useApi';
import IngressoForm from '../components/pages/ingressos/IngressoForm';
import IngressosTable from '../components/pages/ingressos/IngressosTable';

const IngressosPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ingressoToEdit, setIngressoToEdit] = useState(null);
  const [ingressoToDelete, setIngressoToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const { data: ingressos, loading, error, fetchData, createItem, updateItem, deleteItem } = useApi(ingressoService);
  const { data: sessoes, fetchData: fetchSessoes } = useApi(sessaoService);

  useEffect(() => {
    fetchData();
    fetchSessoes();
  }, [fetchData, fetchSessoes]);

  const resetFormState = () => {
    setIngressoToEdit(null);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    resetFormState();
  };

  const handleSubmit = async (dataToSend, id) => {
    const action = id ? updateItem : createItem;
    const result = id ? await action(id, dataToSend) : await action(dataToSend);

    if (result.success) {
      setToast({ message: `Ingresso ${id ? 'atualizado' : 'comprado'} com sucesso!`, type: 'success' });
      handleModalClose();
    } else {
      setToast({ message: result.error || 'Erro ao salvar ingresso', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!ingressoToDelete) return;
    const result = await deleteItem(ingressoToDelete.id);
    if (result.success) {
      setToast({ message: 'Ingresso cancelado com sucesso!', type: 'success' });
    } else {
      setToast({ message: result.error || 'Erro ao cancelar ingresso', type: 'error' });
    }
    setDeleteModalOpen(false);
    setIngressoToDelete(null);
  };

  const openEditModal = (ingresso) => {
    setIngressoToEdit(ingresso);
    setModalOpen(true);
  };

  const openDeleteModal = (ingresso) => {
    setIngressoToDelete(ingresso);
    setDeleteModalOpen(true);
  };

  return (
    <div className="container py-4">
      {loading && <div className="alert alert-info">Carregando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Ingressos</h1>
        <Button onClick={() => setModalOpen(true)}>
          <i className="bi bi-plus-lg me-2"></i>
          Novo Ingresso
        </Button>
      </div>

      <IngressosTable ingressos={ingressos} onEdit={openEditModal} onDelete={openDeleteModal} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirmar Cancelamento"
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
              Não
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Sim, cancelar
            </Button>
          </>
        }
      >
        <p>
          Tem certeza que deseja cancelar o ingresso para <strong>{ingressoToDelete?.sessao.filme.titulo}</strong>?
        </p>
      </Modal>

      {/* Create/Edit Modal */}
      <Modal
        title={ingressoToEdit ? 'Editar Ingresso' : 'Novo Ingresso'}
        isOpen={modalOpen}
        onClose={handleModalClose}
      >
        <IngressoForm
            onSubmit={handleSubmit}
            initialData={ingressoToEdit || {}}
            onCancel={handleModalClose}
            sessoes={sessoes}
        />
      </Modal>
    </div>
  );
};

export default IngressosPage;
