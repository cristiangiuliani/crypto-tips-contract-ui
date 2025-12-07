import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import BlockchainProvider from './providers/Blockchain.provider';
import { GlobalsProvider } from './providers/Globals.provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalsProvider>
      <BlockchainProvider>
        <App />
      </BlockchainProvider>
    </GlobalsProvider>
  </React.StrictMode>
);
