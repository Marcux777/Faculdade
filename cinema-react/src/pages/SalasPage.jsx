import { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';

const SalasPage = () => {
  const [salas, setSalas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    numero: '',
    capacidade: '',
    tipo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar lógica de salvamento
    setSalas([...salas, formData]);
    setModalOpen(false);
    setFormData({ numero: '', capacidade: '', tipo: '' });
  };

  return (
    <div className="container py-4">
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
            {salas.map((sala, index) => (
              <tr key={index}>
                <td>{sala.numero}</td>
                <td>{sala.capacidade}</td>
                <td>{sala.tipo}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2">
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="danger" size="sm">
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Nova Sala"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              Salvar
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Número"
            id="numero"
            value={formData.numero}
            onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
            required
          />
          <Input
            label="Capacidade"
            id="capacidade"
            type="number"
            value={formData.capacidade}
            onChange={(e) => setFormData({ ...formData, capacidade: e.target.value })}
            required
          />
          <div className="mb-3">
            <label htmlFor="tipo" className="form-label">Tipo</label>
            <select
              id="tipo"
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
