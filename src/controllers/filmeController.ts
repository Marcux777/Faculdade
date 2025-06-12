import { Request, Response } from 'express';
import filmeService from '../services/filmeService';

class FilmeController {
  async create(req: Request, res: Response) {
    const { titulo, duracao, classificacao, genero } = req.body;
    const filme = await filmeService.create({
      titulo,
      duracao: Number(duracao),
      classificacao,
      genero,
    });
    return res.status(201).json(filme);
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const filme = await filmeService.findById(id);
    if (!filme) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }
    return res.json(filme);
  }

  async findAll(req: Request, res: Response) {
    const filmes = await filmeService.findAll();
    return res.json(filmes);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { titulo, duracao, classificacao, genero } = req.body;

    // Check if filme exists
    const existingFilme = await filmeService.findById(id);
    if (!existingFilme) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }

    const filme = await filmeService.update(id, {
      titulo,
      duracao: Number(duracao),
      classificacao,
      genero,
    });
    return res.json(filme);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    // Check if filme exists
    const existingFilme = await filmeService.findById(id);
    if (!existingFilme) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }

    await filmeService.delete(id);
    return res.status(204).send();
  }
}

export default new FilmeController();
