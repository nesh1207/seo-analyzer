'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Building, User, Phone, Mail, MapPin, Sparkles } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  grade?: string;
  overallScore?: number;
  checklistCompletionPercent?: number;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  targetUrl,
  grade = 'A',
  overallScore = 88,
  checklistCompletionPercent = 0,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    contactNumber: '',
    email: '',
    location: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.companyName || !formData.contactNumber || !formData.email || !formData.location) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          url: targetUrl || 'Not specified',
          grade,
          overallScore,
          checklistCompletionPercent,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to submit lead request.');
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('Lead Submission Error:', err);
      setErrorMessage(err.message || 'An error occurred while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl sm:p-8">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {submitSuccess ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-2xl font-extrabold text-white">Request Received!</h3>
            <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
              Thank you, <span className="font-semibold text-emerald-400">{formData.name}</span>! Our SEO specialist will reach out to you soon.
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  onClose();
                }}
                className="rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-bold text-zinc-950 shadow-lg hover:bg-emerald-400"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Zone SEO Expert Service</span>
            </div>

            <h2 className="mt-3 text-2xl font-extrabold text-white">
              Submit for Expert Help
            </h2>
            <p className="mt-1 text-xs text-zinc-400">
              Get a custom local SEO strategy, Map Pack ranking roadmap, and technical fixes from our Zone SEO team.
            </p>

            {errorMessage && (
              <div className="mt-4 flex items-center space-x-2 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300">
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Full Name <span className="text-emerald-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Company Name <span className="text-emerald-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <Building className="absolute left-3 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Acme Local Plumbing"
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Contact Number & Email Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Contact Number <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-3 h-4 w-4 text-zinc-500" />
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      required
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Work Email <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 h-4 w-4 text-zinc-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@acme.com"
                      required
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Business Location / City <span className="text-emerald-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="New York, NY"
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-xs font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all hover:brightness-110 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Lead to Zone SEO</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
