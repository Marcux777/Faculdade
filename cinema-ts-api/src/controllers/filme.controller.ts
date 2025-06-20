import { Request, Response } from 'express';
import { z } from 'zod';
import FilmeService from '../services/filme.service';

const baseSchema = {
  titulo: z.string().min(1, 'O título é obrigatório.'),
  classificacao: z.string().min(1, 'A classificação é obrigatória.'),
  genero: z.string().min(1, 'O gênero é obrigatório.'),
  duracao: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number({ invalid_type_error: 'A duração deve ser um número.' })
      .int('A duração deve ser um número inteiro.')
      .positive('A duração deve ser um número positivo.')
  ),
};

const filmeCreateSchema = z.object(baseSchema);

const filmeUpdateSchema = z.object(baseSchema).partial();

class FilmeController {
  async criar(req: Request, res: Response) {
    const { titulo, duracao, classificacao, genero } = filmeCreateSchema.parse(
      req.body
    );
    const poster = req.file?.filename;

    const filme = await FilmeService.create({
      titulo,
      duracao,
      classificacao,
      genero,
      poster,
    });
    return res.status(201).json(filme);
  }

  async listar(req: Request, res: Response) {
    const filmes = await FilmeService.getAll();
    return res.status(200).json(filmes);
  }

  async obter(req: Request, res: Response) {
    const { id } = req.params;
    const filme = await FilmeService.getById(Number(id));
    return res.status(200).json(filme);
  }

  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const data = filmeUpdateSchema.parse(req.body);
    const poster = req.file?.filename;

    const filme = await FilmeService.update(Number(id), {
      ...data,
      poster,
    });
    return res.status(200).json(filme);
  }

  async deletar(req: Request, res: Response) {
    const { id } = req.params;
    await FilmeService.delete(Number(id));
    return res.status(204).send();
  }
}

export default new FilmeController();
