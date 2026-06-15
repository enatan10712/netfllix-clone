import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Please fill in all fields');

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/profiles');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await googleSignIn();
      navigate('/profiles');
    } catch (err) {
      setError('Failed to sign in with Google');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-0744f902144f/af6a74fb-590b-4176-8051-5ca73379148d/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      <div className="absolute top-8 left-8">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
          className="h-8 md:h-12"
        />
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 bg-black/80 p-10 md:p-16 rounded-md w-full max-w-md shadow-2xl backdrop-blur-sm"
      >
        <h1 className="text-3xl font-bold mb-8">Sign In</h1>
        {error && <div className="bg-[#e87c03] text-white p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="bg-[#333] p-4 rounded outline-none focus:ring-2 focus:ring-netflix-red transition duration-300 placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-[#333] p-4 rounded outline-none focus:ring-2 focus:ring-netflix-red transition duration-300 placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            disabled={loading}
            type="submit"
            className="bg-netflix-red p-4 rounded font-bold hover:bg-red-700 transition duration-300 mt-4 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 flex flex-col space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center space-x-2 bg-white text-black p-3 rounded font-bold hover:bg-gray-200 transition duration-300"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="mt-10 text-gray-500">
          New to Netflix? <Link to="/signup" className="text-white hover:underline font-medium">Sign up now</Link>.
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
