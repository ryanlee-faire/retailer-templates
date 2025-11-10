import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';

const LoginCallback: React.FC = () => {
  const { oktaAuth } = useOktaAuth();
  const navigate = useNavigate();

  useEffect(() => {
    oktaAuth.handleLoginRedirect().then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Login error:', error);
      navigate('/');
    });
  }, [oktaAuth, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-[#333333]">Loading...</div>
    </div>
  );
};

export default LoginCallback;

