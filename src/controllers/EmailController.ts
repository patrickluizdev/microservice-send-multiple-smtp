import { Request, Response, NextFunction } from 'express';
import { EmailService } from '../services/EmailService';
import { EmailData } from '../types';

export class EmailController {
  constructor(private emailService: EmailService) {}

  async sendEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.emailService.sendEmail(req.body as EmailData);
      res.status(200).json({ 
        success: true,
        message: 'Email enviado com sucesso', 
        result 
      });
    } catch (error) {
      next(error);
    }
  }
}