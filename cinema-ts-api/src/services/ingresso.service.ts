import { Ingresso, TipoIngresso } from '@prisma/client';
import prisma from '../lib/prisma';
import { NotFoundError } from '../errors/NotFoundError';

interface IngressoCreateData {
  quantidade: number;
  tipoIngresso: TipoIngresso;
  sessaoId: number;
}

interface IngressoUpdateData {
  quantidade?: number;
  tipoIngresso?: TipoIngresso;
  sessaoId?: number;
}

class IngressoService {
  public async create(data: IngressoCreateData): Promise<Ingresso> {
    const sessao = await prisma.sessao.findUnique({
      where: { id: data.sessaoId },
    });

    if (!sessao) {
      throw new NotFoundError('Sessão não encontrada.');
    }

    const valorBase = Number(sessao.valorIngresso);
    const multiplicador = data.tipoIngresso === 'MEIA' ? 0.5 : 1;
    const valorTotal = valorBase * multiplicador * data.quantidade;

    return prisma.ingresso.create({
      data: {
        ...data,
        valorTotal,
      },
    });
  }

  public async findAll(): Promise<Ingresso[]> {
    return prisma.ingresso.findMany({
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
          },
        },
      },
    });
  }

  public async findOne(id: number): Promise<Ingresso> {
    const ingresso = await prisma.ingresso.findUnique({
      where: { id },
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
          },
        },
      },
    });

    if (!ingresso) {
      throw new NotFoundError('Ingresso não encontrado.');
    }
    return ingresso;
  }

  public async update(
    id: number,
    data: IngressoUpdateData
  ): Promise<Ingresso> {
    const ingressoExistente = await prisma.ingresso.findUnique({
      where: { id },
    });

    if (!ingressoExistente) {
      throw new NotFoundError('Ingresso não encontrado.');
    }

    // Default to existing values if not provided
    const newQuantidade = data.quantidade ?? ingressoExistente.quantidade;
    const newTipo = data.tipoIngresso ?? ingressoExistente.tipoIngresso;
    const newSessaoId = data.sessaoId ?? ingressoExistente.sessaoId;

    const sessao = await prisma.sessao.findUnique({
        where: { id: newSessaoId },
    });

    if (!sessao) {
        throw new NotFoundError('Sessão não encontrada.');
    }

    const valorBase = Number(sessao.valorIngresso);
    const multiplicador = newTipo === 'MEIA' ? 0.5 : 1;
    const valorTotal = valorBase * multiplicador * newQuantidade;

    return prisma.ingresso.update({
      where: { id },
      data: {
        quantidade: newQuantidade,
        tipoIngresso: newTipo,
        sessaoId: newSessaoId,
        valorTotal,
      },
    });
  }

  public async delete(id: number): Promise<void> {
    await this.findOne(id); // Throws if not found
    await prisma.ingresso.delete({ where: { id } });
  }
}

export default new IngressoService();
