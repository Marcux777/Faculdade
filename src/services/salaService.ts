import prisma from '../prisma';

interface SalaData {
  numero: number;
  capacidade: number;
  tipo: string;
}

class SalaService {
  async create(data: SalaData) {
    return prisma.sala.create({ data });
  }

  async findById(id: number) {
    return prisma.sala.findUnique({ where: { id } });
  }

  async findAll() {
    return prisma.sala.findMany();
  }

  async update(id: number, data: SalaData) {
    return prisma.sala.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.sala.delete({ where: { id } });
  }
}

export default new SalaService();
