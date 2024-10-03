import { EmailService } from './EmailService';

export function emailServiceFactory(): EmailService {
  return new EmailService();
}