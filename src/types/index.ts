export interface EmailData {
  smtp_user: string;
  smtp_password: string;
  smtp_host: string;
  smtp_port: number;
  from_email: string;
  to_email: string;
  cc_email?: string;
  subject: string;
  body: string;
  signature?: string;
  attachment?: string;
  attachment_name?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}