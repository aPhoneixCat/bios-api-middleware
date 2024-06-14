import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import Logger from './logger';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { envs } from '../config/env';

const mailTo = (message: string, from: string, to: string[], subject: string): void => {
  const transporter: Transporter = nodemailer.createTransport({
    host: envs.SMTP_SERVER_HOST,
    port: envs.SMTP_SERVER_PORT,
    auth: {
      user: envs.SMTP_SERVER_USERNAME,
      pass: envs.SMTP_SERVER_PASSWORD
    }
  } as SMTPTransport.Options);

  const mailOptions: SendMailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      Logger.error('Error when sending email: ' + error);
    } else {
      Logger.info('Email sent: ' + info.response);
    }
  });
}

const errorMailTo = (errorMessage: string, subject?: string) => {
    mailTo(errorMessage, '', [], subject || 'Error Message')
}

export { mailTo, errorMailTo };

