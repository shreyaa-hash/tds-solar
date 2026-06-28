import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Send, ArrowRight } from 'lucide-react';
import ThreeDGlobe from '../components/ThreeDGlobe';
import TiltCard from '../components/TiltCard';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      tempErrors.phone = 'Invalid phone number (must be 10 digits)';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        const formDataToSend = new FormData();
        const nameParts = formData.name.trim().split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '.';
        
        formDataToSend.append('first_name', firstName);
        formDataToSend.append('last_name', lastName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('company', 'TDS Solar Website Customer');
        formDataToSend.append('position', 'Inquiry');
        formDataToSend.append('country', 'India');
        formDataToSend.append('province', 'Uttar Pradesh');
        formDataToSend.append('text', formData.message);
        formDataToSend.append('url', window.location.href);
        formDataToSend.append('catid', '1');
        formDataToSend.append('modelid', '1');
        
        const isStaticHost = window.location.hostname.includes('netlify') || 
                             window.location.hostname.includes('vercel') || 
                             window.location.hostname.includes('github') ||
                             window.location.hostname.includes('localhost');

        if (isStaticHost) {
          // Submit directly to Google Apps Script on static hosts
          const urlEncodedData = new URLSearchParams();
          formDataToSend.forEach((value, key) => {
            urlEncodedData.append(key, value);
          });

          await fetch('https://script.google.com/macros/s/AKfycbzGhO4dWlaIwbW35Szfln-gKUIECJ4vruyDRPhW28jZvegt7Lv8UI0Qe6RdX4GaKzeKOA/exec', {
            method: 'POST',
            body: urlEncodedData,
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          
          setSubmitted(true);
          setFormData({ name: '', email: '', phone: '', message: '' });
          setErrors({});
        } else {
          // Use the PHP mail backend
          const response = await fetch('/php/contact-us.php', {
            method: 'POST',
            body: formDataToSend
          });
          
          const responseText = await response.text();
          
          if (response.ok && responseText.includes('Successfully')) {
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
            setErrors({});
          } else if (response.ok && responseText.includes('failed')) {
            setSubmitError('Failed to send mail. Please try again.');
          } else {
            setSubmitError('Backend handler error. Please check server logs.');
          }
        }
      } catch (error) {
        setSubmitError('Connection error. Please check your network and try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-background text-primary pt-24 min-h-screen relative overflow-hidden"
    >
      
      {/* Background blobs for depth */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(0,174,239,0.05)_0%,_transparent_70%)]" />
        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(0,174,239,0.04)_0%,_transparent_70%)]" />
      </div>

      {/* Banner */}
      <section className="bg-lightbg border-b border-white/5 py-16 text-center relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-lightbg to-lightbg" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-6">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="font-heading text-xs font-bold text-secondary uppercase tracking-widest block">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              Talk to Our Solar Experts
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Schedule a site load analysis survey or ask for customized Waaree solar panel pricing.
            </p>
          </div>

          {/* Action / Toolkit Cards in Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-6">
            <TiltCard className="glass-panel text-left cursor-pointer hover:border-secondary/35 relative overflow-hidden" maxTilt={5}>
              <a
                href="https://script.google.com/macros/s/AKfycbzGhO4dWlaIwbW35Szfln-gKUIECJ4vruyDRPhW28jZvegt7Lv8UI0Qe6RdX4GaKzeKOA/exec"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 sm:p-7 w-full group"
              >
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary border border-secondary/20 flex-shrink-0 group-hover:scale-102 transition-transform">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5.5 h-5.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="9" y1="9" x2="15" y2="9" />
                      <line x1="9" y1="13" x2="15" y2="13" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-white group-hover:text-secondary transition-colors">
                      Calculate Your Solar Size
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 font-semibold leading-relaxed">
                      Estimate required solar system generation capacity.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-secondary group-hover:text-white flex items-center justify-center text-white transition-all flex-shrink-0">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            </TiltCard>

            <TiltCard className="glass-panel text-left cursor-pointer hover:border-secondary/35 relative overflow-hidden" maxTilt={5}>
              <a
                href="https://script.google.com/macros/s/AKfycbzGhO4dWlaIwbW35Szfln-gKUIECJ4vruyDRPhW28jZvegt7Lv8UI0Qe6RdX4GaKzeKOA/exec"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 sm:p-7 w-full group"
              >
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary border border-secondary/20 flex-shrink-0 group-hover:scale-102 transition-transform">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5.5 h-5.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-white group-hover:text-secondary transition-colors">
                      Build Your Solar
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 font-semibold leading-relaxed">
                      Configure your custom solar structures and electrical systems.
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-secondary group-hover:text-white flex items-center justify-center text-white transition-all flex-shrink-0">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Office Contacts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold text-white">Office Details</h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Visit our showroom in Fatehpur, Uttar Pradesh, to check mounting structure designs, cable specifications, and hybrid inverters.
              </p>
            </div>

            {/* Glassmorphic 3D Globe panel */}
            <div className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden h-[290px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,174,239,0.05)_0%,_transparent_70%)] pointer-events-none" />
              <ThreeDGlobe />
              <div className="absolute bottom-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pointer-events-none">
                Interactive Energy Network (Drag to rotate)
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 glass-panel rounded-2xl group shadow-sm">
                <MapPin className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-base">TDS Solar Energies</h4>
                  <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                    0, VIP ROAD OMKAR NAGAR, FATEHPUR, 212601 U.P.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 glass-panel rounded-2xl group shadow-sm">
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-base">Call Support</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-400 font-semibold">
                    <a href="tel:+917800010013" className="hover:text-secondary transition-colors block">
                      +91 78000 10013 <span className="text-[10px] text-zinc-500 font-normal block">B2B & Bulk</span>
                    </a>
                    <a href="tel:+917800010064" className="hover:text-secondary transition-colors block">
                      +91 78000 10064 <span className="text-[10px] text-zinc-500 font-normal block">Residential</span>
                    </a>
                    <a href="tel:+917800010016" className="hover:text-secondary transition-colors block">
                      +91 78000 10016 <span className="text-[10px] text-zinc-500 font-normal block">C&I Projects</span>
                    </a>
                    <a href="tel:+917800070017" className="hover:text-secondary transition-colors block">
                      +91 78000 70017 <span className="text-[10px] text-zinc-500 font-normal block">Support & Service</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 glass-panel rounded-2xl group shadow-sm">
                <Mail className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-base">Email Inquiries</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm text-zinc-400 font-semibold break-all">
                    <a href="mailto:tds@tdssolar.in" className="hover:text-secondary transition-colors block">
                      tds@tdssolar.in
                    </a>
                    <a href="mailto:tdsagro@waareepartners.com" className="hover:text-secondary transition-colors block">
                      tdsagro@waareepartners.com
                    </a>
                    <a href="mailto:tdssolarenergy@gmail.com" className="hover:text-secondary transition-colors block">
                      tdssolarenergy@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Converting Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel rounded-3xl p-8 text-left relative overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-secondary to-accent" />
            <h3 className="font-heading text-xl font-bold text-white mb-6">Send an Inquiry</h3>
            
            {submitted ? (
              <div className="bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-2xl flex items-start space-x-3 text-emerald-300 animate-in fade-in zoom-in duration-200">
                <CheckCircle className="w-6 h-6 flex-shrink-0 text-emerald-450 mt-0.5" />
                <div>
                  <h4 className="font-bold text-base text-emerald-400">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-emerald-300/80 mt-1 leading-relaxed">
                    Our solar engineers will review your inquiry and contact you shortly to schedule a rooftop load analysis.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-secondary transition-colors"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <span className="text-xs text-rose-600 flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-secondary transition-colors"
                    placeholder="name@example.com"
                  />
                  {errors.email && (
                    <span className="text-xs text-rose-600 flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-secondary transition-colors"
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && (
                    <span className="text-xs text-rose-600 flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Message Details</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-secondary transition-colors resize-none"
                    placeholder="Describe your rooftop area, monthly energy bill, or questions..."
                  />
                  {errors.message && (
                    <span className="text-xs text-rose-600 flex items-center space-x-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </span>
                  )}
                </div>

                {submitError && (
                  <div className="bg-rose-950/20 border border-rose-500/20 text-rose-300 p-4 rounded-xl flex items-center space-x-2 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98] shadow-md ${
                    isSubmitting
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-secondary text-white hover:bg-secondary/90 hover:scale-[1.01]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </section>
    </motion.div>
  );
}
