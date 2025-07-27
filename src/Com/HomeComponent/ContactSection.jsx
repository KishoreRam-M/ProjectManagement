import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'Kisho',     
      'template_wpaec5h',     // 👉 replace with your EmailJS template ID
      formData,
      '0bsQVZw21Z6suTriX'       // 👉 replace with your EmailJS public key
    )
    .then(() => {
      setStatus('✅ Message sent successfully!');
      setFormData({ from_name: '', from_email: '', message: '' });
    })
    .catch(() => {
      setStatus('❌ Failed to send message. Try again later.');
    });

    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <section className="bg-[#0F0F1C] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold">Let’s Connect</h2>
          <p className="text-[#A9ADC1] mt-4 text-lg">
            Whether you have a question, idea, or just want to say hi — we’re all ears.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="grid gap-6 text-left">
          <input
            type="text"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="bg-[#1F1F2E] px-5 py-3 rounded-xl border border-[#2F2F44] text-white focus:ring-2 focus:ring-[#5CE1E6]"
          />
          <input
            type="email"
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="bg-[#1F1F2E] px-5 py-3 rounded-xl border border-[#2F2F44] text-white focus:ring-2 focus:ring-[#5CE1E6]"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
            className="bg-[#1F1F2E] px-5 py-3 rounded-xl border border-[#2F2F44] text-white focus:ring-2 focus:ring-[#5CE1E6]"
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#4E9EFF] to-[#5CE1E6] text-[#0F0F1C] font-bold py-3 rounded-xl hover:opacity-90 transition"
          >
            Send Message
          </button>
          {status && <p className="text-green-400 text-sm mt-2">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
