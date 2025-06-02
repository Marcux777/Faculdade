import { useState } from 'react';

export const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa o erro do campo quando ele é alterado
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  const validate = (validationSchema) => {
    const newErrors = {};
    Object.keys(validationSchema).forEach(key => {
      const value = formData[key];
      const rules = validationSchema[key];

      if (rules.required && !value) {
        newErrors[key] = 'Este campo é obrigatório';
      } else if (rules.min && value < rules.min) {
        newErrors[key] = `O valor mínimo é ${rules.min}`;
      } else if (rules.max && value > rules.max) {
        newErrors[key] = `O valor máximo é ${rules.max}`;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[key] = rules.message || 'Formato inválido';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleChange,
    resetForm,
    validate,
    setFormData,
    setErrors
  };
};

export default useForm;
