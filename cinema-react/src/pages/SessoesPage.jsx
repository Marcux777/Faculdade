import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { sessaoService, filmeService, salaService } from '../services/api';

const SessoesPage = () => {
  const [sessoes, setSessoes] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [salas, setSalas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    filmeId: '',
    salaId: '',
    data: '',
    horario: '',
    valorIngresso: ''
  });

  useEffect(() => {
    // Carregar filmes e salas para o formulário
    const carregarDados = async () => {
      try {
        const [filmesRes, salasRes] = await Promise.all([
          filmeService.listar(),
          salaService.listar()
        ]);
        setFilmes(filmesRes.data);
        setSalas(salasRes.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    carregarDados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sessaoService.criar(formData);
      const response = await sessaoService.listar();
      setSessoes(response.data);
      setModalOpen(false);
      setFormData({ filmeId: '', salaId: '', data: '', horario: '', valorIngresso: '' });
    } catch (error) {
      console.error('Erro ao salvar sessão:', error);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Sessões</h1>
        <Button onClick={() => setModalOpen(true)}>
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
            {sessoes.map((sessao, index) => (
              <tr key={index}>
                <td>{sessao.filme?.titulo}</td>
                <td>{sessao.sala?.numero}</td>
                <td>{new Date(sessao.data).toLocaleDateString()}</td>
                <td>{sessao.horario}</td>
                <td>R$ {Number(sessao.valorIngresso).toFixed(2)}</td>
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
        title="Nova Sessão"
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
          <div className="mb-3">
            <label htmlFor="filmeId" className="form-label">Filme</label>
            <select
              id="filmeId"
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
            type="date"
            value={formData.data}
            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            required
          />

          <Input
            label="Horário"
            id="horario"
            type="time"
            value={formData.horario}
            onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
            required
          />

          <Input
            label="Valor do Ingresso"
            id="valorIngresso"
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
