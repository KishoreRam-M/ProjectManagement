import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'Kisho', // Your EmailJS service ID
        'template_wpaec5h', // Your EmailJS template ID
        formData,
        '0bsQVZw21Z6suTriX' // Your EmailJS public key
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
    <section className="bg-[#0F0F1C] py-20 px-6 min-h-screen flex flex-col justify-center">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-800 via-purple-900 to-pink-900 bg-clip-text text-transparent drop-shadow-lg">
          Let’s Connect
        </h2>
        <p className="text-indigo-400 text-lg max-w-2xl mx-auto">
          Whether you have a question, idea, or just want to say hi — we’re all ears.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-[#181829] border border-indigo-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <input
          type="text"
          name="from_name"
          value={formData.from_name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full mb-5 px-5 py-3 rounded-xl bg-[#20202E] border border-indigo-600 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          type="email"
          name="from_email"
          value={formData.from_email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full mb-5 px-5 py-3 rounded-xl bg-[#20202E] border border-indigo-600 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="5"
          required
          className="w-full mb-6 px-5 py-3 rounded-xl bg-[#20202E] border border-indigo-600 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold py-3 rounded-full shadow hover:opacity-90 transition"
        >
          Send Message
        </button>

        {status && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              status.startsWith('✅') ? 'text-green-400' : 'text-red-400'
            } select-text`}
          >
            {status}
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactSection;
