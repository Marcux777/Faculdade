import api from './api';

export const salaService = {
  listar: () => api.get('/salas'),
  obter: (id) => api.get(`/salas/${id}`),
  criar: (sala) => api.post('/salas', sala),
  atualizar: (id, sala) => api.put(`/salas/${id}`, sala),
  excluir: (id) => api.delete(`/salas/${id}`),
};
