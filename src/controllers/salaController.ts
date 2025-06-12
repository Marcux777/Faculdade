import { Request, Response } from 'express';
import salaService from '../services/salaService';

class SalaController {
  async create(req: Request, res: Response) {
    const { numero, capacidade, tipo } = req.body;
    const sala = await salaService.create({
      numero: Number(numero),
      capacidade: Number(capacidade),
      tipo
    });
    return res.status(201).json(sala);
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const sala = await salaService.findById(id);
    if (!sala) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }
    return res.json(sala);
  }

  async findAll(req: Request, res: Response) {
    const salas = await salaService.findAll();
    return res.json(salas);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { numero, capacidade, tipo } = req.body;

    if (!await salaService.findById(id)) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }

    const sala = await salaService.update(id, {
      numero: Number(numero),
      capacidade: Number(capacidade),
      tipo
    });
    return res.json(sala);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!await salaService.findById(id)) {
      return res.status(404).json({ error: 'Sala não encontrada' });
    }
    await salaService.delete(id);
    return res.status(204).send();
  }
}

export default new SalaController();
