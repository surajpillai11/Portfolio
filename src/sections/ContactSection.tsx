import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, MessageSquare } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Reveal } from '../components/animations/Reveal';
import { Magnetic } from '../components/animations/Magnetic';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
  const { personal } = portfolioData;

  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Client-side form validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Please provide a message or opportunity details.';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `New Portfolio Message from ${formState.name}`,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        throw new Error('FormSubmit endpoint error');
      }
    } catch {
      // Direct email fallback in case of strict network / CORS policy
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${formState.name}`
      )}&body=${encodeURIComponent(
        `Hi Suraj,\n\n${formState.message}\n\nFrom,\n${formState.name} (${formState.email})`
      )}`;
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    if (!personal.phone) return;
    navigator.clipboard.writeText(personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <Reveal direction="up" className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1 text-xs font-mono text-zinc-300 mb-3">
          <MessageSquare className="h-3 w-3 text-zinc-400" />
          <span>CONTACT</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Get in <span className="text-gradient">Touch</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Currently open to SDE roles in Java, Spring Boot, and full-stack web development.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact Info & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          <Reveal direction="left" delay={0.1}>
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                Contact Info
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                Have an SDE role open, a project to collaborate on, or want to discuss backend engineering? Send me a message or reach out directly.
              </p>

              {/* Direct Email Card with One-Click Copy */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Email Address</span>
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${personal.email}`}
                  className="font-mono text-sm sm:text-base font-semibold text-zinc-200 hover:underline break-all"
                >
                  {personal.email}
                </a>
              </div>

              {/* Direct Phone Card */}
              {personal.phone && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Phone</span>
                    </span>
                    <button
                      onClick={handleCopyPhone}
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedPhone ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <a
                    href={`tel:+91${personal.phone}`}
                    className="font-mono text-sm sm:text-base font-semibold text-zinc-200 hover:underline"
                  >
                    +91 {personal.phone}
                  </a>
                </div>
              )}

              {/* Location Card */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 mb-6">
                <span className="font-mono text-xs text-zinc-400 flex items-center gap-1.5 mb-1">
                  <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                  <span>Location</span>
                </span>
                <div className="font-heading font-semibold text-white">
                  {personal.location}
                </div>
                <div className="font-mono text-[11px] text-zinc-500 mt-0.5">
                  Timezone: IST (UTC +5:30)
                </div>
              </div>

              {/* Availability Notice */}
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs text-emerald-300 font-medium">
                  Available for SDE role interviews and opportunities.
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <Reveal direction="right" delay={0.2}>
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 font-mono">
                Messages are sent directly to pillai.suraj004@gmail.com.
              </p>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-emerald-400 mb-4 shadow-sm">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4 className="font-heading text-xl font-bold text-white mb-1">
                      Message Sent!
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mb-6 leading-relaxed">
                      Thanks for reaching out! Your message was transmitted directly to <strong className="text-white">pillai.suraj004@gmail.com</strong>.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 font-mono text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block font-mono text-xs text-zinc-300 mb-1.5"
                      >
                        Your Name <span className="text-zinc-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full rounded-xl border bg-black/40 px-4 py-3 font-sans text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:outline-none focus:ring-1 ${
                          errors.name
                            ? 'border-rose-500/80 focus:ring-rose-500/40'
                            : 'border-zinc-800 focus:border-zinc-600 focus:ring-zinc-600'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 font-mono text-[11px] text-rose-400">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block font-mono text-xs text-zinc-300 mb-1.5"
                      >
                        Your Email Address <span className="text-zinc-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className={`w-full rounded-xl border bg-black/40 px-4 py-3 font-sans text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:outline-none focus:ring-1 ${
                          errors.email
                            ? 'border-rose-500/80 focus:ring-rose-500/40'
                            : 'border-zinc-800 focus:border-zinc-600 focus:ring-zinc-600'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 font-mono text-[11px] text-rose-400">{errors.email}</p>
                      )}
                    </div>

                    {/* Message Input */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block font-mono text-xs text-zinc-300 mb-1.5"
                      >
                        Message or Opportunity Details <span className="text-zinc-500">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell me about your team, tech stack, or SDE role..."
                        className={`w-full rounded-xl border bg-black/40 px-4 py-3 font-sans text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:outline-none focus:ring-1 ${
                          errors.message
                            ? 'border-rose-500/80 focus:ring-rose-500/40'
                            : 'border-zinc-800 focus:border-zinc-600 focus:ring-zinc-600'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 font-mono text-[11px] text-rose-400">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Magnetic pullFactor={0.2}>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-zinc-950 shadow-sm transition-all duration-200 hover:bg-zinc-200 hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <Send className="h-4 w-4 text-zinc-800" />
                          <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                        </button>
                      </Magnetic>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
