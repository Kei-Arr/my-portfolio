import type { ContactFormData } from '@/types/contact';

export const validateForm = (formData: ContactFormData): boolean => {
    return formData.name.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.message.trim() !== '';
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const getValidationErrors = (formData: ContactFormData): string[] => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
        errors.push('Name is required');
    }

    if (!formData.email.trim()) {
        errors.push('Email is required');
    } else if (!validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!formData.message.trim()) {
        errors.push('Message is required');
    }

    return errors;
};