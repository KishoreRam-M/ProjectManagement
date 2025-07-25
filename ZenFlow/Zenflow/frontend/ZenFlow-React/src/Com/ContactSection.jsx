import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-[#0F0F1C] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        {/* Heading */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let’s Connect
          </h2>
          <p className="text-[#A9ADC1] mt-4 text-lg">
            Whether you have a question, idea, or just want to say hi — we’re all ears.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-[#181829] p-8 rounded-2xl shadow-lg grid gap-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-[#A9ADC1]">Innovator</p>
              <h3 className="font-semibold text-lg">Kishore Ram M</h3>
            </div>
            <div>
              <p className="text-sm text-[#A9ADC1]">Email</p>
              <a href="mailto:Kishoreramm.dev@gmail.com" className="text-[#5CE1E6] hover:underline">
                Kishoreramm.dev@gmail.com
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <a
                href="https://linkedin.com/in/kishoreramm/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5CE1E6] hover:underline"
              >
                Linkedlin
              </a>
            </div>
            <div>
              <a
                href="https://github.com/KishoreRam-M"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5CE1E6] hover:underline"
              >
                Github
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="grid gap-6 text-left">
          <input
            type="text"
            placeholder="Your Name"
            className="bg-[#1F1F2E] px-5 py-3 rounded-xl border border-[#2F2F44] placeholder:text-[#777] text-white focus:outline-none focus:ring-2 focus:ring-[#5CE1E6]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="bg-[#1F1F2E] px-5 py-3 rounded-xl border border-[#2F2F44] placeholder:text-[#777] text-white focus:outline-none focus:ring-2 focus:ring-[#5CE1E6]"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="bg-[#1F1F2E] px-5 py-3 rounded-xl border border-[#2F2F44] placeholder:text-[#777] text-white focus:outline-none focus:ring-2 focus:ring-[#5CE1E6]"
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#4E9EFF] to-[#5CE1E6] text-[#0F0F1C] font-bold py-3 rounded-xl hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
