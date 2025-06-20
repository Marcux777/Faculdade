import { Prisma, Sessao } from '@prisma/client';
import prisma from '../lib/prisma';
import { NotFoundError } from '../errors/NotFoundError';

interface SessaoCreateData {
  data: Date;
  horario: string;
  valorIngresso: Prisma.Decimal | number;
  filmeId: number;
  salaId: number;
}

interface SessaoUpdateData {
  data?: Date;
  horario?: string;
  valorIngresso?: Prisma.Decimal | number;
  filmeId?: number;
  salaId?: number;
}

class SessaoService {
  public async create(data: SessaoCreateData): Promise<Sessao> {
    // Check if filme and sala exist before creating
    const filme = await prisma.filme.findUnique({ where: { id: data.filmeId } });
    if (!filme) throw new NotFoundError('Filme não encontrado.');

    const sala = await prisma.sala.findUnique({ where: { id: data.salaId } });
    if (!sala) throw new NotFoundError('Sala não encontrada.');

    return prisma.sessao.create({ data });
  }

  public async findAll(): Promise<Sessao[]> {
    return prisma.sessao.findMany({
      include: {
        filme: true,
        sala: true,
      },
    });
  }

  public async findOne(id: number): Promise<Sessao> {
    const sessao = await prisma.sessao.findUnique({
      where: { id },
      include: {
        filme: true,
        sala: true,
      },
    });
    if (!sessao) {
      throw new NotFoundError('Sessão não encontrada.');
    }
    return sessao;
  }

  public async update(id: number, data: SessaoUpdateData): Promise<Sessao> {
    await this.findOne(id); // Ensure it exists
    return prisma.sessao.update({ where: { id }, data });
  }

  public async delete(id: number): Promise<void> {
    await this.findOne(id); // Ensure it exists
    await prisma.sessao.delete({ where: { id } });
  }
}

export default new SessaoService();
