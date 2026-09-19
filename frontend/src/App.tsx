import React, { useEffect, useState } from 'react';
import { Card, Spin, Typography } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { getRouter } from './routes/router';
import { useUser } from './providers/user';
import { checkAuth } from './api';

const { Title, Text } = Typography;

export const App: React.FC = () => {
  const { user, setUser } = useUser();
  const [userChecked, setUserChecked] = useState(false);

  const checkUser = async () => {
    const user = await checkAuth();
    if (user) setUser(user);
    setUserChecked(true);
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (!userChecked) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
          padding: 24,
        }}
      >
        <Card
          style={{
            width: 320,
            textAlign: 'center',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Spin size="large" />
          <Title level={4} style={{ marginTop: 16, marginBottom: 8 }}>
            Loading
          </Title>
          <Text type="secondary">Checking your session...</Text>
        </Card>
      </div>
    );
  }

  return <RouterProvider router={getRouter(user)} />;
};
