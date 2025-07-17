// src/pages/ErrorPage.jsx
import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Oops! Something went wrong.</h1>
      <p>Page not found or an unexpected error occurred.</p>
      <Button type="primary" onClick={() => navigate('/')}>
        Go Home
      </Button>
    </div>
  );
};

export default ErrorPage;
