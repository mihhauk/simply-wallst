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

export const fetchStocks = (page: number, pageSize = 12) => {
  console.log('fetchStocks', page);
  return fetch(API_URL + '/grid/filter?include=info,score', {
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
        ['order_by', 'market_cap', 'desc'],
        ['primary_flag', '=', true],
        ['grid_visible_flag', '=', true],
        ['market_cap', 'is_not_null'],
        ['is_fund', '=', false],
        ['aor', [['country_name', 'in', ['au']]]],
      ]),
    }),
  });
};

export const useInfiniteStocksQuery = () =>
  useInfiniteQuery<StocksQueryResponse, Error>({
    queryKey: ['stocks'],
    queryFn: ({ pageParam = 1 }) =>
      fetchStocks(pageParam).then((res) => res.json()),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });
