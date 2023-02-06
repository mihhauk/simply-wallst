import { useInfiniteQuery } from '@tanstack/react-query';

const API_URL = 'https://api.simplywall.st/api';

export type CompanyData = {
  id: number;
  name: string;
  unique_symbol: string;
  score: {
    data: {
      value: number;
      income: number;
      health: number;
      past: number;
      future: number;
    };
  };
};

export type StocksQueryResponse = {
  data: CompanyData[];
};

export const fetchStocks = (
  countryFilter: string,
  sortOrder: SortOrder,
  page: number,
  pageSize = 12
) =>
  fetch(API_URL + '/grid/filter?include=info,score', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: 1,
      no_result_if_limit: false,
      offset: (page - 1) * pageSize,
      size: pageSize,
      state: 'read',
      rules: JSON.stringify([
        ['order_by', 'market_cap', sortOrder],
        ['primary_flag', '=', true],
        ['grid_visible_flag', '=', true],
        ['market_cap', 'is_not_null'],
        ['is_fund', '=', false],
        ['aor', [['country_name', 'in', [countryFilter]]]],
      ]),
    }),
  });

export const useInfiniteStocksQuery = ({
  countryFilter,
  sortOrder,
}: {
  countryFilter: string;
  sortOrder: SortOrder;
}) =>
  useInfiniteQuery<StocksQueryResponse, Error>({
    queryKey: ['stocks', countryFilter, sortOrder],
    queryFn: ({ pageParam }) =>
      fetchStocks(countryFilter, sortOrder, pageParam).then((res) =>
        res.json()
      ),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });
