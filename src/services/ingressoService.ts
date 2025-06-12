import prisma from '../prisma';
import { TipoIngresso } from '@prisma/client';
import sessaoService from './sessaoService';
import { Decimal } from '@prisma/client/runtime/library';

interface IngressoData {
  quantidade: number;
  tipoIngresso: TipoIngresso;
  sessaoId: number;
}

class IngressoService {
  private async calcularValorTotal(sessaoId: number, quantidade: number, tipo: TipoIngresso): Promise<Decimal> {
    const sessao = await sessaoService.findById(sessaoId);
    if (!sessao) {
      throw new Error("Sessão não encontrada para calcular o valor do ingresso.");
    }

    let valorBase = new Decimal(sessao.valorIngresso).mul(quantidade);
    if (tipo === TipoIngresso.MEIA) {
      valorBase = valorBase.div(2);
    }
    return valorBase;
  }

  async create(data: IngressoData) {
    const valorTotal = await this.calcularValorTotal(data.sessaoId, data.quantidade, data.tipoIngresso);
    return prisma.ingresso.create({
      data: { ...data, valorTotal }
    });
  }

  async findById(id: number) {
    return prisma.ingresso.findUnique({
      where: { id },
      include: { sessao: { include: { filme: true, sala: true } } }
    });
  }

  async findAll() {
    return prisma.ingresso.findMany({
      include: { sessao: { include: { filme: true, sala: true } } }
    });
  }

  async update(id: number, data: IngressoData) {
    const valorTotal = await this.calcularValorTotal(data.sessaoId, data.quantidade, data.tipoIngresso);
    return prisma.ingresso.update({
      where: { id },
      data: { ...data, valorTotal }
    });
  }

  async delete(id: number) {
    return prisma.ingresso.delete({ where: { id } });
  }
}

export default new IngressoService();
