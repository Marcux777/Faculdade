import { Request, Response } from 'express';
import prisma from '../lib/prisma';

class IngressoController {
  async create(req: Request, res: Response) {
    const { quantidade, tipoIngresso, sessaoId } = req.body;

    if (!quantidade || !tipoIngresso || !sessaoId) {
      return res.status(400).json({ error: 'Quantidade, tipo de ingresso e ID da sessão são obrigatórios.' });
    }

    try {
      // Buscar a sessão para obter o valor do ingresso
      const sessao = await prisma.sessao.findUnique({
        where: { id: Number(sessaoId) },
      });

      if (!sessao) {
        return res.status(404).json({ error: 'Sessão não encontrada.' });
      }

      // Calcular valor total baseado no tipo
      const valorBase = Number(sessao.valorIngresso);
      const multiplicador = tipoIngresso === 'MEIA' ? 0.5 : 1;
      const valorTotal = valorBase * multiplicador * Number(quantidade);

      const ingresso = await prisma.ingresso.create({
        data: {
          quantidade: Number(quantidade),
          tipoIngresso,
          valorTotal,
          sessaoId: Number(sessaoId),
        },
      });
      return res.status(201).json(ingresso);
    } catch (error) {
       // @ts-ignore
      if (error.code === 'P2003') {
        return res.status(404).json({ error: 'Sessão não encontrada.' });
      }
      console.error('Erro ao criar ingresso:', error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar o ingresso.' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const ingressos = await prisma.ingresso.findMany({
        include: {
          sessao: { // Inclui os dados da sessão
            include: {
              filme: true, // E também o filme da sessão
              sala: true,  // E a sala da sessão
            }
          }
        },
      });
      return res.status(200).json(ingressos);
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar os ingressos.' });
    }
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const ingresso = await prisma.ingresso.findUnique({
        where: { id: Number(id) },
        include: {
          sessao: {
            include: {
              filme: true,
              sala: true,
            }
          }
        },
      });

      if (!ingresso) {
        return res.status(404).json({ error: 'Ingresso não encontrado.' });
      }

      return res.status(200).json(ingresso);
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar o ingresso.' });
    }
  }

  // A princípio, não se atualiza um ingresso, mas a rota existe caso seja necessário.
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { quantidade, tipoIngresso, sessaoId } = req.body;

    try {
      let valorTotal;

      // Se mudou a sessão, tipo ou quantidade, recalcular valor
      if (quantidade || tipoIngresso || sessaoId) {
        const ingresso = await prisma.ingresso.findUnique({
          where: { id: Number(id) },
          include: { sessao: true }
        });

        if (!ingresso) {
          return res.status(404).json({ error: 'Ingresso não encontrado.' });
        }

        const sessaoId_final = sessaoId ? Number(sessaoId) : ingresso.sessaoId;
        const sessao = await prisma.sessao.findUnique({
          where: { id: sessaoId_final },
        });

        if (!sessao) {
          return res.status(404).json({ error: 'Sessão não encontrada.' });
        }

        const valorBase = Number(sessao.valorIngresso);
        const tipo_final = tipoIngresso || ingresso.tipoIngresso;
        const quantidade_final = quantidade || ingresso.quantidade;
        const multiplicador = tipo_final === 'MEIA' ? 0.5 : 1;
        valorTotal = valorBase * multiplicador * Number(quantidade_final);
      }

      const ingressoAtualizado = await prisma.ingresso.update({
        where: { id: Number(id) },
        data: {
          quantidade: quantidade ? Number(quantidade) : undefined,
          tipoIngresso: tipoIngresso,
          valorTotal: valorTotal,
          sessaoId: sessaoId ? Number(sessaoId) : undefined,
        },
      });
      return res.status(200).json(ingressoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar ingresso:', error);
      return res.status(404).json({ error: 'Ingresso não encontrado ou erro ao atualizar.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.ingresso.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: 'Ingresso não encontrado ou erro ao deletar.' });
    }
  }
}

export default new IngressoController();
