import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            formRef.current?.classList.add('animate-fade-in-up');
          }
        },
        { threshold: 0.3 }
      );
      
      observer.observe(formRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-3xl"></div>
      
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
        style={{
          transform: 'translateZ(0)',
          transformStyle: 'preserve-3d'
        }}
      >
        <h3 className="text-3xl font-semibold text-white mb-8">Send a Message</h3>
        
        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center space-x-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-300">Message sent successfully! I'll get back to you soon.</span>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-300">Something went wrong. Please try again.</span>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Name Field */}
          <div className="group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 hover:bg-gray-700/70 ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-500/50' 
                  : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500/50'
              }`}
              placeholder="Your Name"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-400 animate-fade-in">
                {errors.name}
              </p>
            )}
          </div>
          
          {/* Email Field */}
          <div className="group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 hover:bg-gray-700/70 ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500/50' 
                  : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500/50'
              }`}
              placeholder="your.email@example.com"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-400 animate-fade-in">
                {errors.email}
              </p>
            )}
          </div>
        </div>
        
        {/* Subject Field */}
        <div className="mb-6 group">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Subject <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 hover:bg-gray-700/70 ${
              errors.subject 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500/50'
            }`}
            placeholder="What's this about?"
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1 text-sm text-red-400 animate-fade-in">
              {errors.subject}
            </p>
          )}
        </div>
        
        {/* Message Field */}
        <div className="mb-8 group">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Message <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 hover:bg-gray-700/70 resize-none ${
              errors.message 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500/50'
            }`}
            placeholder="Tell me about your project or idea..."
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-400 animate-fade-in">
              {errors.message}
            </p>
          )}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          style={{
            transform: 'translateZ(0)',
            transformStyle: 'preserve-3d'
          }}
        >
          <span className="flex items-center space-x-3">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Send Message</span>
              </>
            )}
          </span>
          
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;