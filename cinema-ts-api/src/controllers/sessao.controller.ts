import { Request, Response } from 'express';
import { z } from 'zod';
import SessaoService from '../services/sessao.service';

const sessaoCreateSchema = z.object({
  data: z.coerce.date(),
  horario: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de horário inválido. Use HH:MM'),
  valorIngresso: z.coerce.number().positive(),
  filmeId: z.coerce.number().int().positive(),
  salaId: z.coerce.number().int().positive(),
});

const sessaoUpdateSchema = sessaoCreateSchema.partial();

class SessaoController {
  async create(req: Request, res: Response) {
    const data = sessaoCreateSchema.parse(req.body);
    const sessao = await SessaoService.create(data);
    return res.status(201).json(sessao);
  }

  async findAll(req: Request, res: Response) {
    const sessoes = await SessaoService.findAll();
    return res.status(200).json(sessoes);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const sessao = await SessaoService.findOne(Number(id));
    return res.status(200).json(sessao);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = sessaoUpdateSchema.parse(req.body);
    const sessao = await SessaoService.update(Number(id), data);
    return res.status(200).json(sessao);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await SessaoService.delete(Number(id));
    return res.status(204).send();
  }
}

export default new SessaoController();
