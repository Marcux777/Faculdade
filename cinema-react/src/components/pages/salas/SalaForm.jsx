import { useEffect } from 'react';
import useForm from '../../../hooks/useForm';
import Input from '../../common/Input';
import Button from '../../common/Button';

const SalaForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const { formData, setFormData, handleChange, resetForm } = useForm({
    id: null,
    numero: '',
    capacidade: '',
    tipo: '',
    ...initialData,
  });

  useEffect(() => {
    // Sincroniza o estado do formulário se initialData mudar
    // (ex: ao selecionar uma sala diferente para editar)
    setFormData({
      id: null,
      numero: '',
      capacidade: '',
      tipo: '',
      ...initialData,
    });
  }, [initialData, setFormData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, formData.id);
  };

  const handleCancel = () => {
    resetForm();
    if(onCancel) onCancel();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        label="Número"
        id="numero"
        name="numero"
        type="number"
        value={formData.numero}
        onChange={handleChange}
        required
      />
      <Input
        label="Capacidade"
        id="capacidade"
        name="capacidade"
        type="number"
        value={formData.capacidade}
        onChange={handleChange}
        required
      />
      <div className="mb-3">
        <label htmlFor="tipo" className="form-label">Tipo</label>
        <select
          id="tipo"
          name="tipo"
          className="form-select"
          value={formData.tipo}
          onChange={handleChange}
          required
        >
          <option value="">Selecione...</option>
          <option value="D2">2D</option>
          <option value="D3">3D</option>
          <option value="IMAX">IMAX</option>
        </select>
      </div>
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

export default SalaForm;
