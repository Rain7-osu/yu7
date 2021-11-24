import React, { ReactNode, useEffect, useState } from 'react';
import { getAccessTokenAsync } from '@src/api/token';
import { Login } from '@src/pages/Login';

export interface AuthContainerProps {
  children: ReactNode;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    getAccessTokenAsync().then(token => {
      setToken(token);
    });
  }, []);

  if (!token) {
    return <Login />;
  }

  return (
    <>
      {children}
    </>
  );
};
