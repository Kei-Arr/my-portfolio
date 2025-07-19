
import type { ContactFormData } from "@/types/contact";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const sendContactMessage = async (formData: ContactFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'Failed to send message. Please try again.');
    }

    return data;
};