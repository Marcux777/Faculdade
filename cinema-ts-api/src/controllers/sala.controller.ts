import { Request, Response } from 'express';
import { z } from 'zod';
import SalaService from '../services/sala.service';
import { TipoSala } from '@prisma/client';

const salaSchema = {
  numero: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number({ required_error: 'O número da sala é obrigatório.', invalid_type_error: 'O número da sala deve ser um número.' })
      .int('O número da sala deve ser um inteiro.')
      .positive('O número da sala deve ser positivo.')
  ),
  capacidade: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number({ required_error: 'A capacidade é obrigatória.', invalid_type_error: 'A capacidade deve ser um número.' })
      .int('A capacidade deve ser um número inteiro.')
      .positive('A capacidade deve ser positiva.')
  ),
  tipo: z.nativeEnum(TipoSala, { required_error: 'O tipo da sala é obrigatório.' }),
}

const salaCreateSchema = z.object(salaSchema);

const salaUpdateSchema = z.object(salaSchema).partial();

class SalaController {
  async create(req: Request, res: Response) {
    const data = salaCreateSchema.parse(req.body);
    const sala = await SalaService.create(data);
    return res.status(201).json(sala);
  }

  async findAll(req: Request, res: Response) {
    const salas = await SalaService.findAll();
    return res.status(200).json(salas);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const sala = await SalaService.findOne(Number(id));
    return res.status(200).json(sala);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = salaUpdateSchema.parse(req.body);
    const sala = await SalaService.update(Number(id), data);
    return res.status(200).json(sala);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await SalaService.delete(Number(id));
    return res.status(204).send();
  }
}

export default new SalaController();
