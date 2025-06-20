import { useEffect, useState } from 'react';
import useForm from '../../../hooks/useForm';
import Input from '../../common/Input';
import Button from '../../common/Button';

const FilmeForm = ({ onSubmit, initialData, onCancel }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [currentPoster, setCurrentPoster] = useState(null);

  const { formData, setFormData, handleChange } = useForm(initialData);

  useEffect(() => {
    // Sincroniza o estado do formulário se initialData mudar
    // (ex: ao selecionar um filme diferente para editar)
    setFormData(initialData);

    if (initialData?.poster) {
      setCurrentPoster(`/api/uploads/${initialData.poster}`);
      setPreviewImage(null);
    } else {
      setCurrentPoster(null);
      setPreviewImage(null);
    }
  }, [initialData, setFormData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append('titulo', formData.titulo);
    dataToSend.append('duracao', formData.duracao);
    dataToSend.append('classificacao', formData.classificacao);
    dataToSend.append('genero', formData.genero);

    // Only append poster if a new one was selected
    const posterInput = document.getElementById('poster');
    if (posterInput && posterInput.files[0]) {
      dataToSend.append('poster', posterInput.files[0]);
    }

    onSubmit(dataToSend, formData.id);
  };

  const handleCancel = () => {
      // Não precisa mais de resetForm aqui, o useEffect cuida disso
      if(onCancel) onCancel();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        label="Título"
        id="titulo"
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
        required
      />
      <Input
        label="Duração (minutos)"
        id="duracao"
        name="duracao"
        type="number"
        value={formData.duracao}
        onChange={handleChange}
        required
      />
      <Input
        label="Classificação"
        id="classificacao"
        name="classificacao"
        value={formData.classificacao}
        onChange={handleChange}
        required
      />
      <Input
        label="Gênero"
        id="genero"
        name="genero"
        value={formData.genero}
        onChange={handleChange}
        required
      />

      <div className="mb-3">
        <label htmlFor="poster" className="form-label">Banner/Poster</label>
        <input
          type="file"
          className="form-control"
          id="poster"
          name="poster"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="form-text">Formatos aceitos: JPG, PNG, GIF (máx. 5MB)</div>
      </div>

      {/* Preview da imagem */}
      {(previewImage || currentPoster) && (
        <div className="mb-3">
          <label className="form-label">Prévia do Banner:</label>
          <div className="text-center">
            <img
              src={previewImage || currentPoster}
              alt="Prévia do banner"
              style={{
                maxWidth: '300px',
                maxHeight: '400px',
                objectFit: 'cover',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
          </div>
        </div>
      )}

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

export default FilmeForm;
