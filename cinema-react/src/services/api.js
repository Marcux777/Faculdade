import { mockFilmes, mockSalas, mockSessoes, mockIngressos } from '../utils/mockData';
import axios from 'axios';

// Simulação de delay da API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função para simular resposta da API
const mockResponse = async (data) => {
  await delay(300);
  return { data };
};

// Para caso queira usar a API real no futuro
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Serviço de filmes com dados mock
export const filmeService = {
  listar: () => mockResponse(mockFilmes),
  obter: (id) => mockResponse(mockFilmes.find(f => f.id === id)),
  criar: async (filme) => {
    const novoFilme = { ...filme, id: mockFilmes.length + 1 };
    mockFilmes.push(novoFilme);
    return mockResponse(novoFilme);
  },
  atualizar: async (id, filme) => {
    const index = mockFilmes.findIndex(f => f.id === id);
    if (index >= 0) {
      mockFilmes[index] = { ...filme, id };
      return mockResponse(mockFilmes[index]);
    }
    throw new Error('Filme não encontrado');
  },
  excluir: async (id) => {
    const index = mockFilmes.findIndex(f => f.id === id);
    if (index >= 0) {
      mockFilmes.splice(index, 1);
      return mockResponse({});
    }
    throw new Error('Filme não encontrado');
  },
};

// Serviço de salas com dados mock
export const salaService = {
  listar: () => mockResponse(mockSalas),
  obter: (id) => mockResponse(mockSalas.find(s => s.id === id)),
  criar: async (sala) => {
    const novaSala = { ...sala, id: mockSalas.length + 1 };
    mockSalas.push(novaSala);
    return mockResponse(novaSala);
  },
  atualizar: async (id, sala) => {
    const index = mockSalas.findIndex(s => s.id === id);
    if (index >= 0) {
      mockSalas[index] = { ...sala, id };
      return mockResponse(mockSalas[index]);
    }
    throw new Error('Sala não encontrada');
  },
  excluir: async (id) => {
    const index = mockSalas.findIndex(s => s.id === id);
    if (index >= 0) {
      mockSalas.splice(index, 1);
      return mockResponse({});
    }
    throw new Error('Sala não encontrada');
  },
};

// Serviço de sessões com dados mock
export const sessaoService = {
  listar: () => mockResponse(mockSessoes),
  obter: (id) => mockResponse(mockSessoes.find(s => s.id === id)),
  criar: async (sessao) => {
    const novaSessao = {
      ...sessao,
      id: mockSessoes.length + 1,
      filme: mockFilmes.find(f => f.id === parseInt(sessao.filmeId)),
      sala: mockSalas.find(s => s.id === parseInt(sessao.salaId))
    };
    mockSessoes.push(novaSessao);
    return mockResponse(novaSessao);
  },
  atualizar: async (id, sessao) => {
    const index = mockSessoes.findIndex(s => s.id === id);
    if (index >= 0) {
      mockSessoes[index] = {
        ...sessao,
        id,
        filme: mockFilmes.find(f => f.id === parseInt(sessao.filmeId)),
        sala: mockSalas.find(s => s.id === parseInt(sessao.salaId))
      };
      return mockResponse(mockSessoes[index]);
    }
    throw new Error('Sessão não encontrada');
  },
  excluir: async (id) => {
    const index = mockSessoes.findIndex(s => s.id === id);
    if (index >= 0) {
      mockSessoes.splice(index, 1);
      return mockResponse({});
    }
    throw new Error('Sessão não encontrada');
  },
};

// Serviço de ingressos com dados mock
export const ingressoService = {
  listar: () => mockResponse(mockIngressos),
  obter: (id) => mockResponse(mockIngressos.find(i => i.id === id)),
  criar: async (ingresso) => {
    const novoIngresso = {
      ...ingresso,
      id: mockIngressos.length + 1,
      sessao: mockSessoes.find(s => s.id === parseInt(ingresso.sessaoId))
    };
    mockIngressos.push(novoIngresso);
    return mockResponse(novoIngresso);
  },
  atualizar: async (id, ingresso) => {
    const index = mockIngressos.findIndex(i => i.id === id);
    if (index >= 0) {
      mockIngressos[index] = {
        ...ingresso,
        id,
        sessao: mockSessoes.find(s => s.id === parseInt(ingresso.sessaoId))
      };
      return mockResponse(mockIngressos[index]);
    }
    throw new Error('Ingresso não encontrado');
  },
  excluir: async (id) => {
    const index = mockIngressos.findIndex(i => i.id === id);
    if (index >= 0) {
      mockIngressos.splice(index, 1);
      return mockResponse({});
    }
    throw new Error('Ingresso não encontrado');
  },
};
