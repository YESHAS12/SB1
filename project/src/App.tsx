import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { Login } from './pages/Login';
import { Students } from './pages/Students';
import { Sidebar } from './components/Sidebar';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>;
  }

  return isAuthenticated ? (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/students"
          element={
            <PrivateRoute>
              <Students />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;