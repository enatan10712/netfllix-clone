import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import ScrollToTop from './utils/ScrollToTop';

// Lazy load pages for performance
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
  <div className="h-screen w-screen flex items-center justify-center bg-netflix-black">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profiles" element={<ProtectedRoute><Profiles /></ProtectedRoute>} />
          <Route path="/tv-shows" element={<ProtectedRoute><TVShows /></ProtectedRoute>} />
          <Route path="/movies" element={<ProtectedRoute><MoviesPage /></ProtectedRoute>} />
          <Route path="/latest" element={<ProtectedRoute><Latest /></ProtectedRoute>} />
          <Route path="/my-list" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
