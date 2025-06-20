import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NotFoundError } from '../errors/NotFoundError';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Ocorreu um erro:', error.message); // Log mais simples

  if (error instanceof NotFoundError) {
    return res.status(404).json({ message: error.message });
  }

  if (error instanceof z.ZodError) {
    return res
      .status(400)
      .json({ message: 'Erro de validação.', issues: error.issues });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === 'P2002') {
      return res.status(409).json({
        message: `Violação de restrição única no campo: ${error.meta?.target}`,
      });
    }
    // Record to be deleted/updated not found
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Registro não encontrado.' });
    }
  }

  return res.status(500).json({ message: 'Erro interno do servidor.' });
}
