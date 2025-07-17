
export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface SubmitStatus {
    type: 'success' | 'error' | null;
    message: string;
}