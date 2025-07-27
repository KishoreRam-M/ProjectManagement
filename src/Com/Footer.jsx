import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F0F1C] border-t border-[#1F1F2E] text-[#A9ADC1] px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">ZenFlow</h2>
          <p className="mt-2 text-sm">
            Flow better. Work smarter. Trusted by makers worldwide.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-2">Product</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
            <li><a href="#download" className="hover:text-white">Download</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-2">Company</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#about" className="hover:text-white">About Us</a></li>
            <li><a href="#careers" className="hover:text-white">Careers</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
            <li><a href="#blog" className="hover:text-white">Blog</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-2">Connect</h3>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-xs text-[#666A85] mt-10">
        © {new Date().getFullYear()} ZenFlow. Built with focus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
