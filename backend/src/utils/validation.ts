import { ContactFormData } from '../services/emailService';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateContactForm = (data: ContactFormData): ValidationResult => {
  const errors: string[] = [];

  // Check required fields
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  }

  // Validate email format
  if (data.email && !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  // Validate field lengths
  if (data.name && data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  if (data.message && data.message.length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }

  // Check for potentially malicious content
  if (containsSuspiciousContent(data.message)) {
    errors.push('Message contains invalid content');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const containsSuspiciousContent = (content: string): boolean => {
  // Basic check for common spam patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /onclick=/i,
    /onload=/i,
    /<iframe/i,
    /eval\(/i,
    /document\.write/i
  ];

  return suspiciousPatterns.some(pattern => pattern.test(content));
};