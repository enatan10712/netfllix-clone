import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import ScrollToTop from './utils/ScrollToTop';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Search = lazy(() => import('./pages/Search'));
const MyList = lazy(() => import('./pages/MyList'));
const Browse = lazy(() => import('./pages/Browse'));
const TVShows = lazy(() => import('./pages/TVShows'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const Latest = lazy(() => import('./pages/Latest'));
const Profiles = lazy(() => import('./pages/Profiles'));

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to="/" />;
  return children;
};

const LoadingFallback = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-netflix-black">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 border-4 border-gray-800 rounded-full" />
      <div className="absolute inset-0 border-4 border-netflix-red rounded-full animate-spin border-t-transparent" />
    </div>
    <p className="mt-4 text-netflix-red font-bold tracking-widest animate-pulse">NETFLIX</p>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<ProtectedRoute><PageTransition><Home /></PageTransition></ProtectedRoute>} />
          <Route path="/profiles" element={<ProtectedRoute><PageTransition><Profiles /></PageTransition></ProtectedRoute>} />
          <Route path="/tv-shows" element={<ProtectedRoute><PageTransition><TVShows /></PageTransition></ProtectedRoute>} />
          <Route path="/movies" element={<ProtectedRoute><PageTransition><MoviesPage /></PageTransition></ProtectedRoute>} />
          <Route path="/latest" element={<ProtectedRoute><PageTransition><Latest /></PageTransition></ProtectedRoute>} />
          <Route path="/my-list" element={<ProtectedRoute><PageTransition><MyList /></PageTransition></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><PageTransition><Search /></PageTransition></ProtectedRoute>} />
          <Route path="/browse" element={<ProtectedRoute><PageTransition><Browse /></PageTransition></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><PageTransition><Login /></PageTransition></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><PageTransition><Signup /></PageTransition></PublicRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
