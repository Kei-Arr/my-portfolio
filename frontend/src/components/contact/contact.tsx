
import { User, Mail, Send } from 'lucide-react';
import { FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';
import { useContactForm, openExternalLink, socialLinks } from '../../lib';

function ContactForm() {
  const {
    formData,
    isSubmitting,
    submitStatus,
    isFormValid,
    isButtonDisabled,
    handleInputChange,
    handleSubmit
  } = useContactForm();

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
          <div className={`mb-4 p-3 rounded-lg text-sm ${submitStatus.type === 'success'
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
              className="w-full bg-dark-1000 text-white rounded-full py-4 pl-12 pr-4 focus:outline-none focus:bg-[#efdddd36] placeholder-gray-400"
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
              className="w-full bg-dark-1000 text-white rounded-full py-4 pl-12 pr-4 focus:outline-none focus:bg-[#efdddd36] placeholder-gray-400"
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
              className="w-full bg-dark-1000 text-white rounded-2xl py-4 px-4 focus:outline-none focus:bg-[#efdddd36] placeholder-gray-400 resize-none reveal-up"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className={`w-full font-semibold py-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 reveal-up ${isFormValid && !isSubmitting
              ? 'bg-burgundy-600 hover:bg-burgundy-700 text-white'
              : 'bg-burgundy-300 cursor-not-allowed text-gray-400'
              }`}
          >
            <Send size={20} />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-gray-700 reveal-up">
          <button
            className="text-gray-400 bg-transparent border-none p-2 !outline-none focus:outline-none"
            onClick={() => openExternalLink(socialLinks.linkedin)}
            aria-label="Visit LinkedIn Profile"
          >
            <FaLinkedin size={24} />
          </button>
          <button
            className="text-gray-400 bg-transparent border-none p-2 !outline-none focus:outline-none"
            onClick={() => openExternalLink(socialLinks.facebook)}
            aria-label="Visit Facebook Profile"
          >
            <FaFacebook size={24} />
          </button>
          <button
            className="text-gray-400 bg-transparent border-none p-2 !outline-none focus:outline-none"
            onClick={() => openExternalLink(socialLinks.github)}
            aria-label="Visit GitHub Profile"
          >
            <FaGithub size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;