import { StocksQueryResponse, useInfiniteStocksQuery } from '../../api/stocks';
import { useInfiniteScrollQuery } from '../../hooks/useInfiniteScrollQuery';
import { CompanyTile } from '../CompanyTile';
import BeatLoader from 'react-spinners/BeatLoader';

type Props = {};

export function StocksList({}: Props) {
  const { observerCallback, data, isSuccess, isFetchingNextPage } =
    useInfiniteScrollQuery<StocksQueryResponse>({
      query: useInfiniteStocksQuery,
    });

  if (!isSuccess) {
    return <h2>Error</h2>;
  }

  return (
    <div>
      {data?.pages.map((page) =>
        page.data.map(({ id, name, unique_symbol, score }) => (
          <CompanyTile
            key={id}
            name={name}
            unique_symbol={unique_symbol}
            score={score}
          />
        ))
      )}
      <div className="loader" ref={observerCallback}>
        {isFetchingNextPage && (
          <BeatLoader
            loading
            color="#36d7b7"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
    </div>
  );
}
