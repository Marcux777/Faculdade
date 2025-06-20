import prisma from '../lib/prisma';
import { NotFoundError } from '../errors/NotFoundError';

interface IFilmeCreate {
  titulo: string;
  duracao: number;
  classificacao: string;
  genero: string;
  poster?: string;
}

interface IFilmeUpdate {
  titulo?: string;
  duracao?: number;
  classificacao?: string;
  genero?: string;
  poster?: string;
}

class FilmeService {
  public async create(filmeData: IFilmeCreate) {
    return prisma.filme.create({
      data: filmeData,
    });
  }

  public async getAll() {
    return prisma.filme.findMany();
  }

  public async getById(id: number) {
    const filme = await prisma.filme.findUnique({
      where: { id },
    });
    if (!filme) {
      throw new NotFoundError('Filme não encontrado.');
    }
    return filme;
  }

  public async update(id: number, filmeData: IFilmeUpdate) {
    return prisma.filme.update({
      where: { id },
      data: filmeData,
    });
  }

  public async delete(id: number) {
    return prisma.filme.delete({
      where: { id },
    });
  }
}

export default new FilmeService();
