import api from './api';

export const filmeService = {
  listar: () => api.get('/filmes'),
  obter: (id) => api.get(`/filmes/${id}`),
  criar: (filme) => api.post('/filmes', filme),
  atualizar: (id, filme) => api.put(`/filmes/${id}`, filme),
  excluir: (id) => api.delete(`/filmes/${id}`),
};
