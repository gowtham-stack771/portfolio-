import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';
import { Mail, MessageSquare, Send, CheckCircle, ArrowRight, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Valid email is required';
    }
    
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errors.message = 'Message text is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters long';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on write
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Dynamic mock latency emulation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const resetFormSuccessState = () => {
    setSubmitSuccess(false);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0c0c0c] border-t border-[#1a1a1a]">
      {/* Glow lamps */}
      <div className="absolute right-[-100px] top-[10%] w-[350px] h-[350px] rounded-full bg-[#c5a47e]/2 cosmic-glow" />
      <div className="absolute left-[-50px] bottom-[5%] w-[300px] h-[300px] rounded-full bg-[#d6b694]/2 cosmic-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="contact-container">
        {/* Header content */}
        <div className="mb-16 text-left" id="contact-header">
          <div className="inline-flex items-center gap-2 mb-3" id="contact-badge">
            <MessageSquare className="w-4 h-4 text-[#c5a47e]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a47e]">Communication Desk</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight" id="contact-title">
            Get in <span className="font-serif italic font-light text-[#c5a47e]">touch</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl text-base font-light" id="contact-subtitle">
            Have an open mandate, project opportunity, or conceptual system query? Write in below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-layout">
          {/* Details / Coordinates Panel (left block) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between" id="contact-info-panel">
            <div className="space-y-4" id="info-header-block">
              <h3 className="text-2xl font-serif text-white tracking-tight leading-tight" id="info-panel-title">
                Let's construct something <span className="font-serif italic font-light text-[#c5a47e]">extraordinary</span> together.
              </h3>
              <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed align-middle" id="info-panel-desc">
                Whether you need a full systems redesign, microservice engineering, or a premium interface designed from scratch, I'd love to help manifest your vision.
              </p>
            </div>

            {/* Direct addresses */}
            <div className="space-y-4 py-4 border-y border-[#1a1a1a]" id="addresses-list">
              <div className="flex items-center gap-4 p-4 bg-[#111111] border border-[#1a1a1a]" id="addr-email">
                <div className="w-10 h-10 bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center text-[#c5a47e]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500 block">Direct Email</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-xs md:text-sm text-gray-200 font-mono hover:text-[#c5a47e] transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social handles bottom */}
            <div className="space-y-3" id="social-footer-block">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500 block">Digital channels</span>
              <div className="flex items-center gap-2.5" id="social-icons-row">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 bg-[#111111] border border-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c5a47e]/40 transition-all cursor-pointer"
                  id="soc-gh"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 bg-[#111111] border border-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c5a47e]/40 transition-all cursor-pointer"
                  id="soc-li"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 bg-[#111111] border border-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c5a47e]/40 transition-all cursor-pointer"
                  id="soc-tw"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Interactive Panel (right card) */}
          <div className="lg:col-span-7 bg-[#111111] border border-[#1a1a1a] p-6 md:p-8 flex items-center min-h-[460px] relative overflow-hidden" id="contact-form-panel">
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                /* CONTACT FORM DISPLAY */
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="w-full space-y-5"
                  id="fields-form"
                >
                  {/* Name + Email grid row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" id="form-grid-row-1">
                    <div className="space-y-1.5" id="group-name">
                      <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className={`w-full bg-[#0a0a0a] border ${
                          formErrors.name ? 'border-rose-500' : 'border-[#1a1a1a]'
                        } px-4 py-3 text-xs md:text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#c5a47e]/55 transition-colors`}
                      />
                      {formErrors.name && (
                        <p className="text-[10px] font-mono text-rose-500 mt-1" id="err-name">{formErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5" id="group-email">
                      <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@example.com"
                        className={`w-full bg-[#0a0a0a] border ${
                          formErrors.email ? 'border-rose-500' : 'border-[#1a1a1a]'
                        } px-4 py-3 text-xs md:text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#c5a47e]/55 transition-colors`}
                      />
                      {formErrors.email && (
                        <p className="text-[10px] font-mono text-rose-500 mt-1" id="err-email">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5" id="group-subject">
                    <label htmlFor="subject" className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Opportunity details or project inquiry..."
                      className={`w-full bg-[#0a0a0a] border ${
                        formErrors.subject ? 'border-rose-500' : 'border-[#1a1a1a]'
                      } px-4 py-3 text-xs md:text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#c5a47e]/55 transition-colors`}
                    />
                    {formErrors.subject && (
                      <p className="text-[10px] font-mono text-rose-500 mt-1" id="err-subject">{formErrors.subject}</p>
                    )}
                  </div>

                  {/* Message box */}
                  <div className="space-y-1.5" id="group-message">
                    <div className="flex items-center justify-between" id="group-message-label-row">
                      <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                        Message Content
                      </label>
                      <span className="text-[9px] text-gray-600 font-mono tracking-wider uppercase">Min 10 characters</span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Detail your request or integration parameters...."
                      className={`w-full bg-[#0a0a0a] border ${
                        formErrors.message ? 'border-rose-500' : 'border-[#1a1a1a]'
                      } px-4 py-3 text-xs md:text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#c5a47e]/55 transition-colors resize-none`}
                    />
                    {formErrors.message && (
                      <p className="text-[10px] font-mono text-rose-500 mt-1" id="err-message">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit buttons */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#c5a47e] hover:bg-[#d6b694] disabled:bg-[#1a1a1a] disabled:text-gray-600 disabled:cursor-not-allowed text-[#0a0a0a] font-mono font-bold tracking-widest uppercase text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                    id="submit-form-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] animate-spin" />
                        Synchronizing pipeline data...
                      </>
                    ) : (
                      <>
                        Send Transmission
                        <Send className="w-3.5 h-3.5 ml-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                /* SUCCESS SCREEN VIEW */
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full flex flex-col items-center justify-center text-center p-6 md:p-8 space-y-6"
                  id="success-panel"
                >
                  <div className="w-16 h-16 bg-[#0a0a0a] border border-[#c5a47e]/60 flex items-center justify-center text-[#c5a47e] mb-2 shadow-xl animate-pulse" id="success-halo">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-3" id="success-copy">
                    <h3 className="text-2xl font-serif text-white">Transmission Received</h3>
                    <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed font-light">
                      Thank you! Your message has been routed directly to Gowtham's triage queue. Expect a personal callback or follow-up email response inside of 24 operating hours.
                    </p>
                  </div>

                  <button
                    onClick={resetFormSuccessState}
                    className="px-5 py-2.5 border border-[#1a1a1a] bg-[#0a0a0a] text-[10px] font-mono font-semibold uppercase tracking-widest text-[#c5a47e] hover:text-white transition flex items-center gap-2 cursor-pointer"
                    id="reset-form-btn"
                  >
                    Compose New Message
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
