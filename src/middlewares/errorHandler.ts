import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error('Erro:', err);

  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ 
      success: false,
      error: 'JSON inválido no corpo da requisição' 
    });
    return;
  }

  if ((err as any).type === 'entity.too.large') {
    res.status(413).json({ 
      success: false,
      error: 'Payload muito grande. O limite é de 50MB.' 
    });
    return;
  }

  if (err.message.includes('Dados de email inválidos')) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
    return;
  }

  if (err.message.includes('Falha ao enviar email')) {
    res.status(500).json({ 
      success: false,
      error: 'Erro ao enviar email. Por favor, verifique as configurações SMTP e tente novamente.' 
    });
    return;
  }

  res.status(500).json({ 
    success: false,
    error: 'Erro interno do servidor' 
  });
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
  res.status(404).json({ 
    success: false, 
    error: 'Rota não encontrada' 
  });
}

export function methodNotAllowedHandler(req: Request, res: Response): void {
  res.status(405).json({ 
    success: false, 
    error: 'Método não permitido' 
  });
}