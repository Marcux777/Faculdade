import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { ingressoService, sessaoService } from '../services/api';

const IngressosPage = () => {
  const [ingressos, setIngressos] = useState([]);
  const [sessoes, setSessoes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    sessaoId: '',
    quantidade: 1,
    tipoIngresso: 'INTEIRA', // INTEIRA, MEIA
  });

  useEffect(() => {
    // Carregar sessões disponíveis
    const carregarSessoes = async () => {
      try {
        const response = await sessaoService.listar();
        setSessoes(response.data);
      } catch (error) {
        console.error('Erro ao carregar sessões:', error);
      }
    };
    carregarSessoes();
  }, []);

  const calcularValorTotal = () => {
    const sessao = sessoes.find(s => s.id === formData.sessaoId);
    if (!sessao) return 0;
    const valorBase = sessao.valorIngresso * formData.quantidade;
    return formData.tipoIngresso === 'MEIA' ? valorBase / 2 : valorBase;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dadosIngresso = {
        ...formData,
        valorTotal: calcularValorTotal()
      };
      await ingressoService.criar(dadosIngresso);
      const response = await ingressoService.listar();
      setIngressos(response.data);
      setModalOpen(false);
      setFormData({ sessaoId: '', quantidade: 1, tipoIngresso: 'INTEIRA' });
    } catch (error) {
      console.error('Erro ao salvar ingresso:', error);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Ingressos</h1>
        <Button onClick={() => setModalOpen(true)}>
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
            {ingressos.map((ingresso, index) => (
              <tr key={index}>
                <td>{ingresso.sessao?.filme?.titulo}</td>
                <td>{ingresso.sessao?.sala?.numero}</td>
                <td>
                  {new Date(ingresso.sessao?.data).toLocaleDateString()} - {ingresso.sessao?.horario}
                </td>
                <td>{ingresso.quantidade}</td>
                <td>{ingresso.tipoIngresso}</td>
                <td>R$ {Number(ingresso.valorTotal).toFixed(2)}</td>
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
        title="Novo Ingresso"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              Comprar Ingresso
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="sessaoId" className="form-label">Sessão</label>
            <select
              id="sessaoId"
              className="form-select"
              value={formData.sessaoId}
              onChange={(e) => setFormData({ ...formData, sessaoId: e.target.value })}
              required
            >
              <option value="">Selecione uma sessão...</option>
              {sessoes.map(sessao => (
                <option key={sessao.id} value={sessao.id}>
                  {sessao.filme?.titulo} - Sala {sessao.sala?.numero} -
                  {new Date(sessao.data).toLocaleDateString()} - {sessao.horario}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Quantidade"
            id="quantidade"
            type="number"
            min="1"
            value={formData.quantidade}
            onChange={(e) => setFormData({ ...formData, quantidade: parseInt(e.target.value) })}
            required
          />

          <div className="mb-3">
            <label htmlFor="tipoIngresso" className="form-label">Tipo de Ingresso</label>
            <select
              id="tipoIngresso"
              className="form-select"
              value={formData.tipoIngresso}
              onChange={(e) => setFormData({ ...formData, tipoIngresso: e.target.value })}
              required
            >
              <option value="INTEIRA">Inteira</option>
              <option value="MEIA">Meia-Entrada</option>
            </select>
          </div>

          {formData.sessaoId && (
            <div className="alert alert-info">
              <strong>Valor Total:</strong> R$ {calcularValorTotal().toFixed(2)}
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default IngressosPage;
