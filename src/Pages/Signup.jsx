import React, { useRef } from 'react';
import axios from 'axios';

const Signup = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignup = async () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const pass = passwordRef.current.value;

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        name,
        email,
        password: pass,
      });

      console.log('✅ Signup Success:', response.data);

    } catch (error) {
      console.error('❌ Signup failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F1C] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#181829] rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-semibold text-center text-white mb-8 tracking-wide">
          Create Account
        </h2>

        <div className="flex flex-col gap-6">
          <input
            ref={nameRef}
            type="text"
            placeholder="Enter your Name"
            className="h-12 px-4 bg-[#1E1E30] text-white border border-[#292945] rounded-lg placeholder:text-[#A9ADC1] focus:outline-none focus:ring-2 focus:ring-[#4E9EFF]"
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your Email"
            className="h-12 px-4 bg-[#1E1E30] text-white border border-[#292945] rounded-lg placeholder:text-[#A9ADC1] focus:outline-none focus:ring-2 focus:ring-[#4E9EFF]"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter your Password"
            className="h-12 px-4 bg-[#1E1E30] text-white border border-[#292945] rounded-lg placeholder:text-[#A9ADC1] focus:outline-none focus:ring-2 focus:ring-[#4E9EFF]"
          />

          <button
            onClick={handleSignup}
            className="bg-[linear-gradient(90deg,#4E9EFF,#5CE1E6)] text-[#0F0F1C] font-semibold py-3 rounded-xl shadow-lg hover:opacity-90 transition duration-200"
          >
            Start Flow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
