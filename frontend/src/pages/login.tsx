import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api';
import { useUser } from '../providers/user';

export default function LoginPage() {
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await loginApi(username, password);
      setUser(user);
      navigate('/');
    } catch (err) {
      setError(
        `Login failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <div>
          <button type="submit" disabled={!username || !password}>
            Login
          </button>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
}
