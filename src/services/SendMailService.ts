import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

import { Survey } from '../entities/Survey';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  survey: Survey;
  user_id: string;
  mailPath: string;
  link: string;
}

class SendMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async execute({
    to,
    from,
    survey,
    user_id,
    link,
    mailPath,
  }: ISendMailDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(mailPath).toString('utf-8');

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const variables = {
      name: to.name,
      title: survey.title,
      description: survey.description,
      user_id,
      link,
    };

    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      from: {
        name: from?.name ?? 'NPS',
        address: from?.email ?? 'noreplay@nps.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: survey.title,
      html,
    });

    console.log('Message send: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
