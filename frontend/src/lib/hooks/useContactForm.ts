import { useState } from 'react';
import type { ContactFormData, SubmitStatus } from '@/types/contact';
import { validateForm } from '@/lib/validation/contact';
import { sendContactMessage } from '@/lib/api/contactApi';

const initialFormData: ContactFormData = {
    name: '',
    email: '',
    message: ''
};

const initialSubmitStatus: SubmitStatus = {
    type: null,
    message: ''
};

export const useContactForm = () => {
    const [formData, setFormData] = useState<ContactFormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(initialSubmitStatus);

    const isFormValid = validateForm(formData);
    const isButtonDisabled = isSubmitting || !isFormValid;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setSubmitStatus(initialSubmitStatus);
    };

    const handleSubmit = async () => {
        // Basic validation (safety net)
        if (!isFormValid) {
            setSubmitStatus({
                type: 'error',
                message: 'Please fill in all fields'
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(initialSubmitStatus);

        try {
            await sendContactMessage(formData);

            setSubmitStatus({
                type: 'success',
                message: 'Message sent successfully! I\'ll get back to you soon.'
            });

            // Reset form
            setFormData(initialFormData);
        } catch (error) {
            if (error instanceof Error) {
                setSubmitStatus({
                    type: 'error',
                    message: error.message
                });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: 'Network error. Please check your connection and try again.'
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        isSubmitting,
        submitStatus,
        isFormValid,
        isButtonDisabled,
        handleInputChange,
        handleSubmit,
        resetForm
    };
};