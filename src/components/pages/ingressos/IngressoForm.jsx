import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import Input from '../common/Input';
import Button from '../common/Button';
import { format } from 'date-fns';

const IngressoForm = ({ onSubmit, initialData = {}, onCancel, sessoes }) => {
  const { formData, setFormData, handleChange, resetForm } = useForm({
    id: null,
    sessaoId: '',
    quantidade: 1,
    tipoIngresso: 'INTEIRA',
  });

  useEffect(() => {
    if (initialData.id) {
      setFormData({
        ...initialData,
        sessaoId: initialData.sessao?.id || '',
      });
    } else {
      resetForm();
    }
  }, [initialData, setFormData, resetForm]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      sessaoId: parseInt(formData.sessaoId, 10),
      quantidade: parseInt(formData.quantidade, 10),
    };
    onSubmit(dataToSend, formData.id);
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) onCancel();
  };

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
          disabled={!!formData.id}
        >
          <option value="">Selecione uma sessão...</option>
          {sessoes.map((sessao) => (
            <option key={sessao.id} value={sessao.id}>
              {`${sessao.filme?.titulo} - Sala ${sessao.sala?.numero} - ${
                sessao.data && sessao.horario
                  ? `${format(new Date(sessao.data), 'dd/MM/yyyy')} ${sessao.horario}`
                  : ''
              }`}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Quantidade"
        id="quantidade"
        name="quantidade"
        type="number"
        min="1"
        value={formData.quantidade}
        onChange={handleChange}
        required
      />

      <div className="mb-3">
        <label htmlFor="tipoIngresso" className="form-label">Tipo de Ingresso</label>
        <select
          id="tipoIngresso"
          name="tipoIngresso"
          className="form-select"
          value={formData.tipoIngresso}
          onChange={handleChange}
          required
        >
          <option value="INTEIRA">Inteira</option>
          <option value="MEIA">Meia-Entrada</option>
        </select>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button type="button" variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {formData.id ? 'Atualizar' : 'Comprar Ingresso'}
        </Button>
      </div>
    </form>
  );
};

export default IngressoForm;
