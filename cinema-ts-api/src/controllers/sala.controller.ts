import { Request, Response } from 'express';
import prisma from '../lib/prisma';

class SalaController {
  async create(req: Request, res: Response) {
    const { numero, capacidade, tipo } = req.body;

    const numeroAsNumber = Number(numero);
    const capacidadeAsNumber = Number(capacidade);

    if (isNaN(numeroAsNumber) || isNaN(capacidadeAsNumber) || !tipo) {
      return res.status(400).json({ error: 'Número, capacidade e tipo são obrigatórios e devem ser válidos.' });
    }

    try {
      const sala = await prisma.sala.create({
        data: {
          numero: numeroAsNumber,
          capacidade: capacidadeAsNumber,
          tipo,
        },
      });
      return res.status(201).json(sala);
    } catch (error) {
      // @ts-ignore
      if (error.code === 'P2002') { // Unique constraint violation
        return res.status(409).json({ error: 'Uma sala com este número já existe.' });
      }
      console.error('Erro não tratado ao criar sala:', error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar a sala.' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const salas = await prisma.sala.findMany();
      return res.status(200).json(salas);
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar as salas.' });
    }
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const sala = await prisma.sala.findUnique({
        where: { id: Number(id) },
      });

      if (!sala) {
        return res.status(404).json({ error: 'Sala não encontrada.' });
      }

      return res.status(200).json(sala);
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar a sala.' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { numero, capacidade, tipo } = req.body;

    try {
      const sala = await prisma.sala.update({
        where: { id: Number(id) },
        data: {
          numero: numero ? Number(numero) : undefined,
          capacidade: capacidade ? Number(capacidade) : undefined,
          tipo,
        },
      });
      return res.status(200).json(sala);
    } catch (error) {
      return res.status(404).json({ error: 'Sala não encontrada ou erro ao atualizar.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.sala.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: 'Sala não encontrada ou erro ao deletar.' });
    }
  }
}

export default new SalaController();
