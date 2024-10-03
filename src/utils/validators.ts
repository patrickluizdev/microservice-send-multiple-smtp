import { EmailData, ValidationResult } from '../types';

export function validateEmailData(emailData: Partial<EmailData>): ValidationResult {
  const errors: string[] = [];
  const requiredFields: (keyof EmailData)[] = ['smtp_user', 'smtp_password', 'smtp_host', 'smtp_port', 'from_email', 'to_email', 'subject', 'body'];

  for (const field of requiredFields) {
    if (!emailData[field]) {
      errors.push(`Campo obrigatório ausente: ${field}`);
    }
  }

  if (emailData.smtp_port && (isNaN(emailData.smtp_port) || emailData.smtp_port <= 0)) {
    errors.push('smtp_port deve ser um número positivo');
  }

  if (emailData.attachment && !emailData.attachment_name) {
    errors.push('attachment_name é obrigatório quando um attachment é fornecido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}