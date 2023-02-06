import { useState } from 'react';
import styles from './app.module.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StocksList } from './components/StocksList';
import { CountrySelect } from './components/CountrySelect';
import { SortOptions } from './components/SortOptions';

const queryClient = new QueryClient();

function App() {
  const [countryFilter, setCountryFilter] = useState('au');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.controls}>
        <CountrySelect value={countryFilter} onChange={setCountryFilter} />
        <SortOptions value={sortOrder} onChange={setSortOrder} />
      </div>
      <StocksList countryFilter={countryFilter} sortOrder={sortOrder} />
    </QueryClientProvider>
  );
}

export default App;
