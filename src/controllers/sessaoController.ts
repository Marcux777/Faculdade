import { Request, Response } from 'express';
import sessaoService from '../services/sessaoService';

class SessaoController {
  async create(req: Request, res: Response) {
    const { data, horario, valorIngresso, filmeId, salaId } = req.body;
    const sessao = await sessaoService.create({
      data,
      horario,
      valorIngresso: Number(valorIngresso),
      filmeId: Number(filmeId),
      salaId: Number(salaId)
    });
    return res.status(201).json(sessao);
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const sessao = await sessaoService.findById(id);
    if (!sessao) {
      return res.status(404).json({ error: 'Sessão não encontrada' });
    }
    return res.json(sessao);
  }

  async findAll(req: Request, res: Response) {
    const sessoes = await sessaoService.findAll();
    return res.json(sessoes);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { data, horario, valorIngresso, filmeId, salaId } = req.body;

    if (!await sessaoService.findById(id)) {
      return res.status(404).json({ error: 'Sessão não encontrada' });
    }

    const sessao = await sessaoService.update(id, {
      data,
      horario,
      valorIngresso: Number(valorIngresso),
      filmeId: Number(filmeId),
      salaId: Number(salaId)
    });
    return res.json(sessao);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!await sessaoService.findById(id)) {
      return res.status(404).json({ error: 'Sessão não encontrada' });
    }
    await sessaoService.delete(id);
    return res.status(204).send();
  }
}

export default new SessaoController();
