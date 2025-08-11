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
        email,
        password,
      });

      const token = response.data.jwt;
      localStorage.setItem('jwtToken', token);

      console.log('✅ Login Success:', token);
      alert('Login Success!');
    } catch (error) {
      console.error('❌ Login Error:', error.response?.data || error.message);
      alert('Login Failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6 font-sans text-gray-100">
      <div className="w-full max-w-md bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl border border-indigo-700 shadow-lg p-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4E9EFF] to-[#5CE1E6] mb-10 text-center tracking-wide">
          Welcome Back
        </h2>

        <div className="flex flex-col gap-7">
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your Email"
            className="h-14 px-5 bg-gray-800 rounded-2xl border border-indigo-700 placeholder-indigo-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter your Password"
            className="h-14 px-5 bg-gray-800 rounded-2xl border border-indigo-700 placeholder-indigo-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-[#4E9EFF] to-[#5CE1E6] text-gray-900 font-semibold py-4 rounded-3xl shadow-lg hover:opacity-90 transition duration-200"
          >
            Login to ZenFlow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
