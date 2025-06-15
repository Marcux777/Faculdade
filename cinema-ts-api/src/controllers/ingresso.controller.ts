import { Request, Response } from 'express';
import prisma from '../lib/prisma';

class IngressoController {
  async create(req: Request, res: Response) {
    const { assento, sessaoId } = req.body;

    if (!assento || !sessaoId) {
      return res.status(400).json({ error: 'Assento e ID da sessão são obrigatórios.' });
    }

    try {
      const ingresso = await prisma.ingresso.create({
        data: {
          assento,
          sessaoId: Number(sessaoId),
        },
      });
      return res.status(201).json(ingresso);
    } catch (error) {
      // @ts-ignore
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'Este assento já foi vendido para esta sessão.' });
      }
       // @ts-ignore
      if (error.code === 'P2003') {
        return res.status(404).json({ error: 'Sessão não encontrada.' });
      }
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
    const { assento, sessaoId } = req.body;

    try {
      const ingresso = await prisma.ingresso.update({
        where: { id: Number(id) },
        data: {
          assento,
          sessaoId: sessaoId ? Number(sessaoId) : undefined,
        },
      });
      return res.status(200).json(ingresso);
    } catch (error) {
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