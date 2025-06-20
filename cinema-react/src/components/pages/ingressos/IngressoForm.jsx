import { useEffect } from 'react';
import useForm from '../../../hooks/useForm';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { format } from 'date-fns';

const IngressoForm = ({ onSubmit, initialData = {}, onCancel, sessoes = [] }) => {
  const { formData, setFormData, handleChange } = useForm({
    id: null,
    sessaoId: '',
    nomeCliente: '',
    emailCliente: '',
    assento: '',
    ...initialData,
  });

  useEffect(() => {
    // Sincroniza o estado do formulário se initialData mudar
    let dataFormatted = initialData;
    if (initialData.sessao) {
      dataFormatted = {
        ...initialData,
        sessaoId: initialData.sessao?.id || initialData.sessaoId || '',
      };
    }

    setFormData({
      id: null,
      sessaoId: '',
      nomeCliente: '',
      emailCliente: '',
      assento: '',
      ...dataFormatted,
    });
  }, [initialData, setFormData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      sessaoId: parseInt(formData.sessaoId, 10),
    };
    onSubmit(dataToSend, formData.id);
  };

  const handleCancel = () => {
    if(onCancel) onCancel();
  };

  const selectedSessao = sessoes.find(s => s.id === Number(formData.sessaoId));

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="sessaoId" className="form-label">Sessão</label>
        <select
          id="sessaoId"
          name="sessaoId"
          className="form-select"
          value={formData.sessaoId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma sessão...</option>
          {sessoes.map(sessao => (
            <option key={sessao.id} value={sessao.id}>
              {sessao.filme?.titulo} - Sala {sessao.sala?.numero} - {format(new Date(sessao.data), 'dd/MM/yyyy')} às {sessao.horario}
            </option>
          ))}
        </select>
      </div>

      {selectedSessao && (
        <div className="mb-3 p-3 bg-light rounded">
          <h6>Detalhes da Sessão</h6>
          <p><strong>Filme:</strong> {selectedSessao.filme?.titulo}</p>
          <p><strong>Sala:</strong> {selectedSessao.sala?.numero} ({selectedSessao.sala?.tipo})</p>
          <p><strong>Data/Hora:</strong> {format(new Date(selectedSessao.data), 'dd/MM/yyyy')} às {selectedSessao.horario}</p>
          <p><strong>Valor:</strong> R$ {Number(selectedSessao.valorIngresso).toFixed(2)}</p>
        </div>
      )}

      <Input
        label="Nome do Cliente"
        id="nomeCliente"
        name="nomeCliente"
        type="text"
        value={formData.nomeCliente}
        onChange={handleChange}
        required
      />

      <Input
        label="Email do Cliente"
        id="emailCliente"
        name="emailCliente"
        type="email"
        value={formData.emailCliente}
        onChange={handleChange}
        required
      />

      <Input
        label="Assento"
        id="assento"
        name="assento"
        type="text"
        placeholder="Ex: A1, B5, C10"
        value={formData.assento}
        onChange={handleChange}
        required
      />

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button type="button" variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {formData.id ? 'Atualizar' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
};

export default IngressoForm;
