import prisma from '../prisma';
import { Decimal } from '@prisma/client/runtime/library';

interface SessaoData {
  data: string;
  horario: string;
  valorIngresso: number | Decimal;
  filmeId: number;
  salaId: number;
}

class SessaoService {
  async create(data: SessaoData) {
    return prisma.sessao.create({
      data: {
        ...data,
        data: new Date(data.data)
      }
    });
  }

  async findById(id: number) {
    return prisma.sessao.findUnique({
      where: { id },
      include: { filme: true, sala: true }
    });
  }

  async findAll() {
    return prisma.sessao.findMany({
      include: { filme: true, sala: true }
    });
  }

  async update(id: number, data: SessaoData) {
    return prisma.sessao.update({
      where: { id },
      data: {
        ...data,
        data: new Date(data.data)
      }
    });
  }

  async delete(id: number) {
    return prisma.sessao.delete({ where: { id } });
  }
}

export default new SessaoService();
