import { TipoSala } from '@prisma/client';
import prisma from '../lib/prisma';
import { NotFoundError } from '../errors/NotFoundError';

interface SalaCreateData {
  numero: number;
  capacidade: number;
  tipo: TipoSala;
}

interface SalaUpdateData {
  numero?: number;
  capacidade?: number;
  tipo?: TipoSala;
}

class SalaService {
  public async create(data: SalaCreateData) {
    return prisma.sala.create({
      data,
    });
  }

  public async findAll() {
    return prisma.sala.findMany();
  }

  public async findOne(id: number) {
    const sala = await prisma.sala.findUnique({
      where: { id },
    });
    if (!sala) {
      throw new NotFoundError('Sala não encontrada.');
    }
    return sala;
  }

  public async update(id: number, data: SalaUpdateData) {
    await this.findOne(id);
    return prisma.sala.update({
      where: { id },
      data,
    });
  }

  public async delete(id: number) {
    await this.findOne(id);
    await prisma.sala.delete({
      where: { id },
    });
  }
}

export default new SalaService();
