import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import Input from '../common/Input';
import Button from '../common/Button';
import { format } from 'date-fns';

const SessaoForm = ({ onSubmit, initialData = {}, onCancel, filmes, salas }) => {
  const { formData, setFormData, handleChange, resetForm } = useForm({
    id: null,
    filmeId: '',
    salaId: '',
    data: '',
    horario: '',
    valorIngresso: '',
  });

  useEffect(() => {
    if (initialData.id) {
      setFormData({
        ...initialData,
        filmeId: initialData.filme?.id || '',
        salaId: initialData.sala?.id || '',
        data: initialData.data ? format(new Date(initialData.data), 'yyyy-MM-dd') : '',
      });
    } else {
      resetForm();
    }
  }, [initialData, setFormData, resetForm]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, formData.id);
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="filmeId" className="form-label">Filme</label>
        <select
          id="filmeId"
          name="filmeId"
          className="form-select"
          value={formData.filmeId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um filme...</option>
          {filmes.map((filme) => (
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
          name="salaId"
          className="form-select"
          value={formData.salaId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma sala...</option>
          {salas.map((sala) => (
            <option key={sala.id} value={sala.id}>
              Sala {sala.numero} - {sala.tipo}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Data"
        id="data"
        name="data"
        type="date"
        value={formData.data}
        onChange={handleChange}
        required
      />

      <Input
        label="Horário"
        id="horario"
        name="horario"
        type="time"
        value={formData.horario}
        onChange={handleChange}
        required
      />

      <Input
        label="Valor do Ingresso"
        id="valorIngresso"
        name="valorIngresso"
        type="number"
        step="0.01"
        min="0"
        value={formData.valorIngresso}
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

export default SessaoForm;
