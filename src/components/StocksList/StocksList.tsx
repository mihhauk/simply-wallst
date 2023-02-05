import React from 'react';
import { useStocksQuery } from '../../api/stocks';
import { CompanyTile } from '../CompanyTile';

type Props = {};

export function StocksList({}: Props) {
  const { isLoading, error, data } = useStocksQuery();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error</h2>;
  }

  return (
    <div>
      {data.data.map(({ name, unique_symbol, score }) => (
        <CompanyTile name={name} unique_symbol={unique_symbol} score={score} />
      ))}
    </div>
  );
}
