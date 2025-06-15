import { Request, Response } from 'express';
import prisma from '../lib/prisma';

class FilmeController {
  async create(req: Request, res: Response) {
    const { titulo, duracao, classificacao, genero } = req.body;

    if (!titulo || !duracao || !classificacao || !genero) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
      const filme = await prisma.filme.create({
        data: {
          titulo,
          duracao,
          classificacao,
          genero,
        },
      });
      return res.status(201).json(filme);
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu um erro ao criar o filme.' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const filmes = await prisma.filme.findMany();
      return res.status(200).json(filmes);
    } catch (error) {
      console.error('STACK /api/filmes =>', error);
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar os filmes.' });
    }
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const filme = await prisma.filme.findUnique({
        where: { id: Number(id) },
      });

      if (!filme) {
        return res.status(404).json({ error: 'Filme não encontrado.' });
      }

      return res.status(200).json(filme);
    } catch (error) {
      return res.status(500).json({ error: 'Ocorreu um erro ao buscar o filme.' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { titulo, duracao, classificacao, genero } = req.body;

    try {
      const filme = await prisma.filme.update({
        where: { id: Number(id) },
        data: {
          titulo,
          duracao,
          classificacao,
          genero,
        },
      });
      return res.status(200).json(filme);
    } catch (error) {
      return res.status(404).json({ error: 'Filme não encontrado ou erro ao atualizar.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.filme.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send(); // 204 No Content
    } catch (error) {
      return res.status(404).json({ error: 'Filme não encontrado ou erro ao deletar.' });
    }
  }
}

export default new FilmeController(); 