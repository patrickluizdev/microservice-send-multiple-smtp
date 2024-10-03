# Microservice Send Multiple SMTP

Este é um microserviço desenvolvido com Express.js para enviar e-mails através de diferentes configurações SMTP. O serviço permite a validação dos dados do e-mail e fornece tratamento de erros para garantir que as requisições sejam processadas adequadamente.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework para construir aplicações web
- **Nodemailer**: Biblioteca para enviar e-mails
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática

## Funcionalidades

- Envio de e-mails com múltiplas configurações SMTP
- Validação de dados de entrada para evitar erros
- Tratamento de erros com mensagens apropriadas
- Registro de logs para monitorar requisições
- Contêiner Docker que facilita o deploy e execução

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/patrickluizdev/microservice-send-multiple-smtp.git
   cd microservice-send-multiple-smtp
   ```

2. Construa o container:

   ```bash
   docker build -t microservice-send-multiple-smtp .
   ```
   OU, utilize a imagem no Docker Registry:
   ```bash
   docker run -d -p 3000:3000 --name microservice-send-multiple-smtp jatabara/microservice-send-multiple-smtp:latest
   ```

3. Inicie o container:

   ```bash
   docker run -d -p 3000:3000 --name microservice-send-multiple-smtp microservice-send-multiple-smtp
   ```

## Uso

O microserviço escuta na porta configurada (por padrão, 3000). Para enviar um e-mail, faça uma requisição POST para o endpoint `/send-email` com o seguinte corpo JSON:

```json
{
  "smtp_user": "usuario@example.com",      // Campo obrigatório: usuário SMTP para autenticação
  "smtp_password": "senha",                 // Campo obrigatório: senha para autenticação SMTP
  "smtp_host": "smtp.example.com",          // Campo obrigatório: host do servidor SMTP
  "smtp_port": 587,                         // Campo obrigatório: porta do servidor SMTP
  "from_email": "remetente@example.com",    // Campo obrigatório: e-mail do remetente
  "to_email": "destinatario@example.com",    // Campo obrigatório: e-mail do destinatário
  "cc_email": "copiado@example.com",        // Campo opcional: e-mail para cópia (CC)
  "subject": "Assunto do E-mail",           // Campo obrigatório: assunto do e-mail
  "body": "Corpo do e-mail",                 // Campo obrigatório: corpo do e-mail
  "signature": "Atenciosamente, Nome",      // Campo opcional: assinatura a ser incluída no corpo do e-mail
  "attachment": "dados_base64",              // Campo opcional: dados do anexo em formato base64
  "attachment_name": "nome_do_arquivo.ext"  // Campo opcional: nome do arquivo do anexo
}
```

## Tratamento de Erros

O serviço implementa um tratamento de erros, retornando mensagens apropriadas para diferentes tipos de falhas:

- **400 Bad Request**: Dados de e-mail inválidos ou JSON inválido.
- **404 Not Found**: Rota não encontrada no servidor.
- **405 Method Not Allowed**: Método HTTP não permitido para a rota requisitada.
- **413 Payload Too Large**: O corpo da requisição excede o limite de 50MB.
- **500 Internal Server Error**: Erros não tratados ou falhas no servidor ao processar a requisição.

## Observação de Segurança

Este microserviço deve ser utilizado exclusivamente como em Server-side, para evitar o risco de transmitir credenciais sensíveis via protocolo HTTP/HTTPS. As informações de autenticação SMTP devem ser sempre mantidas em segurança e não devem ser expostas em requisições.