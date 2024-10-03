import { Request, Response } from 'express';

export function methodNotAllowedHandler(req: Request, res: Response): void {
  res.status(405).json({ 
    success: false, 
    error: 'Método não permitido' 
  });
}
