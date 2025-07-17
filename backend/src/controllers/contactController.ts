import { Request, Response } from 'express';
import EmailService, { ContactFormData } from '../services/emailService';
import { validateContactForm } from '../utils/validation';

const emailService = new EmailService();

export const sendContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message }: ContactFormData = req.body;

    // Validate input
    const validation = validateContactForm({ name, email, message });
    if (!validation.isValid) {
      res.status(400).json({
        success: false,
        message: validation.errors.join(', ')
      });
      return;
    }

    // Send email
    await emailService.sendContactEmail({ name, email, message });

    res.json({
      success: true,
      message: 'Message sent successfully!'
    });

  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    });
  }
};

export const healthCheck = (req: Request, res: Response): void => {
  res.json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    service: 'Portfolio Contact API'
  });
};