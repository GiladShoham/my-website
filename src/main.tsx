import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { OnUIProvider } from '../.onui/OnUIProvider';

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OnUIProvider>
      <App />
    </OnUIProvider>
  </StrictMode>
);
