import nodemailer from 'nodemailer';
import { createEmailTemplate } from '../templates/emailTemplate';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendContactEmail(data: ContactFormData): Promise<void> {
    const { name, email, message } = data;

    const mailOptions = {
      from: `"Portfolio:" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `${name}(${email}) sent you a message.`,
      html: createEmailTemplate(name, email, message)
    };

    await this.transporter.sendMail(mailOptions);
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

export default EmailService;