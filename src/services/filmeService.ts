import prisma from '../prisma';

interface FilmeData {
  titulo: string;
  duracao: number;
  classificacao: string;
  genero: string;
}

class FilmeService {
  async create(data: FilmeData) {
    const filme = await prisma.filme.create({ data });
    return filme;
  }

  async findById(id: number) {
    const filme = await prisma.filme.findUnique({ where: { id } });
    return filme;
  }

  async findAll() {
    const filmes = await prisma.filme.findMany();
    return filmes;
  }

  async update(id: number, data: FilmeData) {
    const filme = await prisma.filme.update({
      where: { id },
      data,
    });
    return filme;
  }

  async delete(id: number) {
    await prisma.filme.delete({ where: { id } });
  }
}

export default new FilmeService();
