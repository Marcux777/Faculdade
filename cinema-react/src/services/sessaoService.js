import api from './api';

export const sessaoService = {
  listar: () => api.get('/sessoes'),
  obter: (id) => api.get(`/sessoes/${id}`),
  criar: (sessao) => api.post('/sessoes', sessao),
  atualizar: (id, sessao) => api.put(`/sessoes/${id}`, sessao),
  excluir: (id) => api.delete(`/sessoes/${id}`),
};
