import { useQuery } from '@tanstack/react-query';

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

type StocksQueryResponse = {
  data: CompanyData[];
};

export const fetchStocks = () =>
  fetch(API_URL + '/grid/filter?include=info,score', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: 1,
      no_result_if_limit: false,
      offset: 0,
      size: 12,
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

export const useStocksQuery = () =>
  useQuery<StocksQueryResponse, Error>({
    queryKey: ['stocks'],
    queryFn: () => fetchStocks().then((res) => res.json()),
  });
