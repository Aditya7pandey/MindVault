import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import AskPage from './pages/AskPage';
import AuthPage from './pages/AuthPage';
import PublicVaultPage from './pages/PublicVaultPage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Showcase } from './components/Showcase';
import { useStore } from './store/useStore';
import { useEffect } from 'react';
import { ShareModal } from './components/ShareModal';
import VerifyPage from './pages/VerifyPage';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030303]">
      <Navbar />
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1.2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        <Showcase />
        <Features />
        <HowItWorks />
        <CTA />
      </m.main>

      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useStore();

  // In a real app, we'd wait for checkAuth to finish before redirecting
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function App() {
  const { checkAuth } = useStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <LazyMotion features={domAnimation}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/share/:shareId" element={<PublicVaultPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <AskPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ShareModal />
      </Router>
    </LazyMotion>
  );
}

export default App;
