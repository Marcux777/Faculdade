import { Request, Response } from 'express';
import { z } from 'zod';
import IngressoService from '../services/ingresso.service';
import { TipoIngresso } from '@prisma/client';

const ingressoCreateSchema = z.object({
  quantidade: z.coerce.number().int().positive(),
  tipoIngresso: z.nativeEnum(TipoIngresso),
  sessaoId: z.coerce.number().int().positive(),
});

const ingressoUpdateSchema = ingressoCreateSchema.partial();

class IngressoController {
  async create(req: Request, res: Response) {
    const data = ingressoCreateSchema.parse(req.body);
    const ingresso = await IngressoService.create(data);
    return res.status(201).json(ingresso);
  }

  async findAll(req: Request, res: Response) {
    const ingressos = await IngressoService.findAll();
    return res.status(200).json(ingressos);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const ingresso = await IngressoService.findOne(Number(id));
    return res.status(200).json(ingresso);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = ingressoUpdateSchema.parse(req.body);
    const ingresso = await IngressoService.update(Number(id), data);
    return res.status(200).json(ingresso);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await IngressoService.delete(Number(id));
    return res.status(204).send();
  }
}

export default new IngressoController();
