import express from 'express';
import { EmailController } from './controllers/EmailController';
import { emailServiceFactory } from './services/EmailServiceFactory';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { methodNotAllowedHandler } from './middlewares/methodNotAllowedHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(loggerMiddleware);

const emailService = emailServiceFactory();
const emailController = new EmailController(emailService);

app.post('/send-email', (req, res, next) => emailController.sendEmail(req, res, next));

app.use(notFoundHandler);
app.use(methodNotAllowedHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Microsserviço de email rodando na porta ${port}`);
});