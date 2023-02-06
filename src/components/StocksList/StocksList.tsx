import { StocksQueryResponse, useInfiniteStocksQuery } from '../../api/stocks';
import { useInfiniteScrollQuery } from '../../hooks/useInfiniteScrollQuery';
import { CompanyTile } from '../CompanyTile';
import { Loader } from '../Loader';
import styles from './stocksList.module.scss';

type Props = {
  countryFilter: string;
  sortOrder: SortOrder;
};

export function StocksList({ countryFilter, sortOrder }: Props) {
  const {
    observerCallback,
    data,
    isSuccess,
    isFetchingNextPage,
    isInitialLoading,
  } = useInfiniteScrollQuery<StocksQueryResponse>({
    query: () => useInfiniteStocksQuery({ countryFilter, sortOrder }),
  });
  if (isInitialLoading) {
    return <Loader />;
  }

  const noResults = !data?.pages[0]?.data.length;

  if (!isSuccess) {
    return <h2>Error</h2>;
  }

  return (
    <div className={styles.list}>
      {noResults && <span className={styles.noResults}>No results</span>}
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
      <div ref={observerCallback}>
        {!isInitialLoading && isFetchingNextPage && <Loader />}
      </div>
    </div>
  );
}
