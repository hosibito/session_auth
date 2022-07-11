import React from 'react';
import ReactDOM from 'react-dom/client';

import { Reset } from 'styled-reset';
import { RecoilRoot } from 'recoil';

import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  
);
root.render(
  // <React.StrictMode>
  <>
    <Reset />
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>      
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
