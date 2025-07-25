import React, { useRef } from 'react';
import axios from 'axios';

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post('http://localhost:8080/auth/signin', {
        email: email,
        password: password,
      });

      const token = response.data.jwt;

      // ✅ Save token globally (localStorage)
      localStorage.setItem('jwtToken', token);

      console.log('✅ Login Success:', token);
      alert('Login Success!');
    } catch (error) {
      console.error('❌ Login Error:', error.response?.data || error.message);
      alert('Login Failed!');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F1C] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#181829] rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-semibold text-center text-white mb-8 tracking-wide">
          Welcome Back
        </h2>

        <div className="flex flex-col gap-6">
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
            onClick={handleLogin}
            className="bg-[linear-gradient(90deg,#4E9EFF,#5CE1E6)] text-[#0F0F1C] font-semibold py-3 rounded-xl shadow-lg hover:opacity-90 transition duration-200"
          >
            Login to ZenFlow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
