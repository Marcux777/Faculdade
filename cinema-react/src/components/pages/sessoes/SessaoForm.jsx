import { useEffect, useState } from 'react';
import useForm from '../../../hooks/useForm';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { format } from 'date-fns';

const SessaoForm = ({ onSubmit, initialData = {}, onCancel, filmes = [], salas = [] }) => {
  const { formData, setFormData, handleChange } = useForm({
    id: null,
    filmeId: '',
    salaId: '',
    data: '',
    horario: '',
    valorIngresso: '',
    ...initialData,
  });

  useEffect(() => {
    // Sincroniza o estado do formulário se initialData mudar
    let dataFormatted = initialData;
    if (initialData.data) {
      dataFormatted = {
        ...initialData,
        data: format(new Date(initialData.data), 'yyyy-MM-dd'),
        filmeId: initialData.filme?.id || initialData.filmeId || '',
        salaId: initialData.sala?.id || initialData.salaId || '',
      };
    }

    setFormData({
      id: null,
      filmeId: '',
      salaId: '',
      data: '',
      horario: '',
      valorIngresso: '',
      ...dataFormatted,
    });
  }, [initialData, setFormData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      filmeId: parseInt(formData.filmeId, 10),
      salaId: parseInt(formData.salaId, 10),
      valorIngresso: parseFloat(formData.valorIngresso),
    };
    onSubmit(dataToSend, formData.id);
  };

  const handleCancel = () => {
    if(onCancel) onCancel();
  };

  const selectedFilme = filmes.find(f => f.id === Number(formData.filmeId));

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
          {filmes.map(filme => (
            <option key={filme.id} value={filme.id}>
              {filme.titulo}
            </option>
          ))}
        </select>
      </div>

      {selectedFilme && selectedFilme.poster && (
        <div className="mb-3 text-center">
          <img
            src={`/api/uploads/${selectedFilme.poster}`}
            alt="Pôster do filme"
            style={{ width: '100px', height: 'auto', margin: '0 auto' }}
          />
        </div>
      )}

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
          {salas.map(sala => (
            <option key={sala.id} value={sala.id}>
              Sala {sala.numero} - {sala.tipo} ({sala.capacidade} lugares)
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
