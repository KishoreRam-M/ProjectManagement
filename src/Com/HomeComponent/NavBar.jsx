import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="backdrop-blur-md bg-[#181829]/70 border-b border-[#1F1F2E]/60 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#00D4FF] via-[#4E9EFF] to-[#5CE1E6] bg-clip-text text-transparent font-sans drop-shadow-[0_1px_2px_rgba(255,255,255,0.15)] hover:scale-105 transition-transform duration-300">
              ZenFlow
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[#DDE3F0] hover:text-cyan-300 font-medium">Home</Link>
            <Link to="/login" className="text-[#DDE3F0] hover:text-cyan-300 font-medium">Reconnect</Link>
            <Link to="/signup" className="text-[#DDE3F0] hover:text-cyan-300 font-medium">Join</Link>
            <Link to="/create" className="text-[#DDE3F0] hover:text-cyan-300 font-medium">Launch</Link>
            <Link to="/projects" className="text-[#DDE3F0] hover:text-cyan-300 font-medium">Arc</Link>

          </div>

          {/* CTA & Dark Mode Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              className="w-10 h-10 rounded-full border border-[#5CE1E6]/40 text-[#5CE1E6] hover:bg-[#202030] transition duration-300 flex items-center justify-center"
              title="Toggle Dark Mode"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M22 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7" />
              </svg>
            </button>

            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
