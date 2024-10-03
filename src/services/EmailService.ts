import nodemailer from 'nodemailer';
import { EmailData } from '../types';
import { validateEmailData } from '../utils/validators';

export class EmailService {
  async sendEmail(emailData: EmailData): Promise<nodemailer.SentMessageInfo> {
    const validationResult = validateEmailData(emailData);
    if (!validationResult.isValid) {
      throw new Error(`Dados de email inválidos: ${validationResult.errors.join(', ')}`);
    }

    const {
      smtp_user,
      smtp_password,
      smtp_host,
      smtp_port,
      from_email,
      to_email,
      cc_email,
      subject,
      body,
      signature,
      attachment,
      attachment_name
    } = emailData;

    const transporter = nodemailer.createTransport({
      host: smtp_host,
      port: smtp_port,
      secure: smtp_port === 465,
      auth: {
        user: smtp_user,
        pass: smtp_password
      }
    });

    const mailOptions: nodemailer.SendMailOptions = {
      from: from_email,
      to: to_email,
      cc: cc_email,
      subject: subject,
      text: `${body}\n\n${signature || ''}`,
      attachments: attachment ? [
        {
          filename: attachment_name,
          content: Buffer.from(attachment, 'base64')
        }
      ] : []
    };

    console.log('Enviando email...');
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email enviado:', info.messageId);
      return info;
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw new Error(`Falha ao enviar email: ${(error as Error).message}`);
    }
  }
}