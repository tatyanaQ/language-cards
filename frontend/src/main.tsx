import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from './providers/user';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
