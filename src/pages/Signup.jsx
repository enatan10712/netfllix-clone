import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account: ' + err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await googleSignIn();
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with Google: ' + err.message);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black flex flex-col items-center justify-center">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-0744f902144f/af6a74fb-590b-4176-8051-5ca73379148d/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      <div className="absolute top-8 left-8">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
          className="h-12"
        />
      </div>

      <div className="relative z-10 bg-black/75 p-12 md:p-16 rounded-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
        {error && <div className="bg-orange-600/20 text-orange-600 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-700/50 p-3 rounded outline-none focus:bg-gray-600 transition duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-700/50 p-3 rounded outline-none focus:bg-gray-600 transition duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-gray-700/50 p-3 rounded outline-none focus:bg-gray-600 transition duration-300"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            disabled={loading}
            type="submit"
            className="bg-netflix-red p-3 rounded font-bold hover:bg-red-700 transition duration-300 mt-4 disabled:opacity-50"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 flex flex-col space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center space-x-2 bg-white text-black p-3 rounded font-bold hover:bg-gray-200 transition duration-300"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
            <span>Sign up with Google</span>
          </button>
        </div>

        <div className="mt-8 text-gray-400">
          Already have an account? <Link to="/login" className="text-white hover:underline">Sign in</Link>.
        </div>
      </div>
    </div>
  );
};

export default Signup;
