import { Request, Response } from 'express';
import ingressoService from '../services/ingressoService';
import { TipoIngresso } from '@prisma/client';

class IngressoController {
  async create(req: Request, res: Response) {
    const { quantidade, tipoIngresso, sessaoId } = req.body;
    if (!Object.values(TipoIngresso).includes(tipoIngresso)) {
      return res.status(400).json({ error: 'Tipo de ingresso inválido' });
    }
    const ingresso = await ingressoService.create({
      quantidade: Number(quantidade),
      tipoIngresso,
      sessaoId: Number(sessaoId)
    });
    return res.status(201).json(ingresso);
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ingresso = await ingressoService.findById(id);
    if (!ingresso) {
      return res.status(404).json({ error: 'Ingresso não encontrado' });
    }
    return res.json(ingresso);
  }

  async findAll(req: Request, res: Response) {
    const ingressos = await ingressoService.findAll();
    return res.json(ingressos);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { quantidade, tipoIngresso, sessaoId } = req.body;

    if (!await ingressoService.findById(id)) {
      return res.status(404).json({ error: 'Ingresso não encontrado' });
    }
    if (!Object.values(TipoIngresso).includes(tipoIngresso)) {
        return res.status(400).json({ error: 'Tipo de ingresso inválido' });
    }

    const ingresso = await ingressoService.update(id, {
        quantidade: Number(quantidade),
        tipoIngresso,
        sessaoId: Number(sessaoId)
    });
    return res.json(ingresso);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!await ingressoService.findById(id)) {
      return res.status(404).json({ error: 'Ingresso não encontrado' });
    }
    await ingressoService.delete(id);
    return res.status(204).send();
  }
}

export default new IngressoController();
