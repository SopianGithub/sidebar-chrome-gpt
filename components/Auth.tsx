import React, { useState, useEffect, ReactNode, createContext, useContext } from 'react';
import { Spin } from 'antd'; // Import Spin from Ant Design
import AuthLayout from './layouts/AuthLayout';

interface AuthContextType {
  session: any; // Define your session type here
  setSession: (session: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [timeout, setTimeoutReached] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/session', {
          mode: 'cors',
        });
        const sessionData = await response.json();
        setSession(sessionData);
      } catch (error) {
        console.error('Error checking session:', error);
        setSession(null);
        setLoading(false);
      } finally {
        setLoading(false); // Set loading to false after session check
      }
    };

    const timeoutId = setTimeout(() => {
      setTimeoutReached(true);
      setLoading(false);
    }, 5000); // 5 seconds timeout

    checkSession();

    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const Auth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { session } = useAuth();  
  const [loading, setLoading] = useState<boolean>(true);
  const [timeout, setTimeoutReached] = useState<boolean>(false);

  useEffect(() => {
    if (session !== null) {
      setLoading(false);
    }
  }, [session]);

  // if (loading) {
  //   return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />;
  // }

  if (timeout || !session) {
    return <AuthLayout />;
  }

  return <>{children}</>;
};

export default Auth;