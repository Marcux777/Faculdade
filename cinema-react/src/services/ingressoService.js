import api from './api';

export const ingressoService = {
  listar: () => api.get('/ingressos'),
  obter: (id) => api.get(`/ingressos/${id}`),
  criar: (ingresso) => api.post('/ingressos', ingresso),
  atualizar: (id, ingresso) => api.put(`/ingressos/${id}`, ingresso),
  excluir: (id) => api.delete(`/ingressos/${id}`),
};
