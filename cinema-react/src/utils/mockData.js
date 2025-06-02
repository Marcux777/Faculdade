// Mock de dados para testes
export const mockFilmes = [
  {
    id: 1,
    titulo: 'Matrix',
    duracao: 136,
    classificacao: '14',
    genero: 'Ficção Científica'
  },
  {
    id: 2,
    titulo: 'Inception',
    duracao: 148,
    classificacao: '14',
    genero: 'Ficção Científica'
  }
];

export const mockSalas = [
  {
    id: 1,
    numero: '1',
    capacidade: 100,
    tipo: '3D'
  },
  {
    id: 2,
    numero: '2',
    capacidade: 80,
    tipo: '2D'
  }
];

export const mockSessoes = [
  {
    id: 1,
    filmeId: 1,
    salaId: 1,
    data: '2025-06-02',
    horario: '19:00',
    valorIngresso: 30.00,
    filme: mockFilmes[0],
    sala: mockSalas[0]
  },
  {
    id: 2,
    filmeId: 2,
    salaId: 2,
    data: '2025-06-02',
    horario: '20:00',
    valorIngresso: 25.00,
    filme: mockFilmes[1],
    sala: mockSalas[1]
  }
];

export const mockIngressos = [
  {
    id: 1,
    sessaoId: 1,
    quantidade: 2,
    tipoIngresso: 'INTEIRA',
    valorTotal: 60.00,
    sessao: mockSessoes[0]
  }
];
