import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StocksList } from './components/StocksList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StocksList />
    </QueryClientProvider>
  );
}

export default App;
