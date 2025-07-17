import React, { useState } from 'react';
import { User, Mail, Send } from 'lucide-react';
import { FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa'

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen w-full relative overflow-hidden bg-dark-900 flex items-center justify-center py-20 px-4">
      <div className="bg-dark-800 rounded-2xl p-8 w-full max-w-md shadow-2xl reveal-up">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-burgundy-500 mb-2 reveal-up">Get in touch</h2>
          <p className="text-gray-300 text-sm reveal-up">
            Have something to discuss? Send me a message.
          </p>
        </div>

        {/* Status Message */}
        {submitStatus.type && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            submitStatus.type === 'success' 
              ? 'bg-green-900 text-green-300 border border-green-700' 
              : 'bg-red-900 text-red-300 border border-red-700'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <div className="space-y-4">
          <div className="relative reveal-up">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400">
              <User size={20} />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full bg-dark-1000 text-white rounded-full py-4 pl-12 pr-4 focus:outline-none focus:bg-[#EFDDDD99] placeholder-gray-400"
              disabled={isSubmitting}
            />
          </div>

          <div className="relative reveal-up">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400">
              <Mail size={20} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full bg-dark-1000 text-white rounded-full py-4 pl-12 pr-4 focus:outline-none focus:bg-[#EFDDDD99] placeholder-gray-400"
              disabled={isSubmitting}
            />
          </div>

          <div className="relative reveal-up">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message..."
              rows={4}
              className="w-full bg-dark-1000 text-white rounded-2xl py-4 px-4 focus:outline-none focus:bg-[#EFDDDD99] placeholder-gray-400 resize-none reveal-up"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-burgundy-500 hover:bg-burgundy-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 reveal-up"
          >
            <Send size={20} />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-gray-700 reveal-up">
          <button className="text-gray-400 hover:text-white transition-colors duration-200 bg-transparent border-none p-0 ">
            <FaLinkedin size={24} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200 bg-transparent border-none p-0 ">
            <FaFacebook size={24} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors duration-200 bg-transparent border-none p-0 ">
            <FaGithub size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
export default ContactForm;