import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout/Layout';
import { LoginForm } from './components/Auth/LoginForm';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Courses } from './pages/Courses';
import { Payments } from './pages/Payments';
import { Exams } from './pages/Exams';

// Placeholder components for other pages
const Teachers = () => <div className="p-6"><h1 className="text-2xl font-bold">Gestion des Enseignants</h1><p>Page en cours de développement...</p></div>;
const Staff = () => <div className="p-6"><h1 className="text-2xl font-bold">Gestion du Personnel</h1><p>Page en cours de développement...</p></div>;
const Transcripts = () => <div className="p-6"><h1 className="text-2xl font-bold">Relevés de Notes</h1><p>Page en cours de développement...</p></div>;
const Settings = () => <div className="p-6"><h1 className="text-2xl font-bold">Paramètres</h1><p>Page en cours de développement...</p></div>;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <Layout>{children}</Layout>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/students" element={
        <ProtectedRoute>
          <Students />
        </ProtectedRoute>
      } />
      <Route path="/courses" element={
        <ProtectedRoute>
          <Courses />
        </ProtectedRoute>
      } />
      <Route path="/teachers" element={
        <ProtectedRoute>
          <Teachers />
        </ProtectedRoute>
      } />
      <Route path="/staff" element={
        <ProtectedRoute>
          <Staff />
        </ProtectedRoute>
      } />
      <Route path="/payments" element={
        <ProtectedRoute>
          <Payments />
        </ProtectedRoute>
      } />
      <Route path="/exams" element={
        <ProtectedRoute>
          <Exams />
        </ProtectedRoute>
      } />
      <Route path="/transcripts" element={
        <ProtectedRoute>
          <Transcripts />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;