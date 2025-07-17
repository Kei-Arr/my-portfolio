
import type { ContactFormData } from "@/types/contact";

export const sendContactMessage = async (formData: ContactFormData) => {
    const response = await fetch('http://localhost:5000/api/contact', {
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