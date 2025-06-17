import { Request, Response } from 'express';
import prisma from '../lib/prisma';

class SessaoController {
  async create(req: Request, res: Response) {
    const { data, horario, valorIngresso, filmeId, salaId } = req.body;

    if (!data || !horario || valorIngresso === undefined || !filmeId || !salaId) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
      const sessao = await prisma.sessao.create({
        data: {
          data: new Date(data),
          horario,
          valorIngresso,
          filmeId: Number(filmeId),
          salaId: Number(salaId),
        },
      });
      return res.status(201).json(sessao);
    } catch (error) {
       // @ts-ignore
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'Já existe uma sessão para este filme, nesta sala e horário.' });
      }
      return res.status(500).json({ error: 'Ocorreu um erro ao criar a sessão.' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const sessoes = await prisma.sessao.findMany({
        include: {
          filme: true, // Inclui os dados do filme relacionado
          sala: true,  // Inclui os dados da sala relacionada
        },
      });
      return res.status(200).json(sessoes);
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar as sessões.' });
    }
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const sessao = await prisma.sessao.findUnique({
        where: { id: Number(id) },
        include: {
          filme: true,
          sala: true,
        },
      });

      if (!sessao) {
        return res.status(404).json({ error: 'Sessão não encontrada.' });
      }

      return res.status(200).json(sessao);
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar a sessão.' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { data, horario, valorIngresso, filmeId, salaId } = req.body;

    try {
      const sessao = await prisma.sessao.update({
        where: { id: Number(id) },
        data: {
          data: data ? new Date(data) : undefined,
          horario: horario,
          valorIngresso: valorIngresso,
          filmeId: filmeId ? Number(filmeId) : undefined,
          salaId: salaId ? Number(salaId) : undefined,
        },
      });
      return res.status(200).json(sessao);
    } catch (error) {
      return res.status(404).json({ error: 'Sessão não encontrada ou erro ao atualizar.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.sessao.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: 'Sessão não encontrada ou erro ao deletar.' });
    }
  }
}

export default new SessaoController();
