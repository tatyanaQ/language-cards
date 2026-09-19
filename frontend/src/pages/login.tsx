import { useState } from 'react';
import { Alert, Button, Card, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api';
import { useUser } from '../providers/user';

type LoginFormValues = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { setUser } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (values: LoginFormValues) => {
    setError(null);
    setLoading(true);

    try {
      const { user } = await loginApi(values.username.trim(), values.password);
      setUser(user);
      navigate('/');
    } catch (err) {
      setError(
        `Login failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '24px',
      }}
    >
      <Card title="Login" style={{ width: 360 }}>
        <Form<LoginFormValues>
          layout="vertical"
          onFinish={login}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input placeholder="username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          {error && (
            <Alert
              type="error"
              showIcon
              message={error}
              style={{ marginBottom: 16 }}
            />
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
