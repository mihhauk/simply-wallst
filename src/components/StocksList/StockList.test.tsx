import { render, screen } from '@testing-library/react';
import { useInfiniteScrollQuery } from '../../hooks/useInfiniteScrollQuery';
import { mockResponse } from '../../testData/mockResponse';
import { StocksList } from './StocksList';

const mockedUseInfiniteScrollQuery = useInfiniteScrollQuery as jest.Mock<any>;

jest.mock('../../hooks/useInfiniteScrollQuery');

describe('StocksList', () => {
  it('renders company name', () => {
    mockedUseInfiniteScrollQuery.mockImplementation(() => ({
      isSuccess: true,
      data: {
        pages: [mockResponse],
      },
    }));
    render(<StocksList countryFilter="au" sortOrder="desc" />);

    expect(screen.getByText('BHP Group')).toBeVisible();
  });

  it('renders unique symbol', () => {
    mockedUseInfiniteScrollQuery.mockImplementation(() => ({
      isSuccess: true,
      data: {
        pages: [mockResponse],
      },
    }));
    render(<StocksList countryFilter="au" sortOrder="desc" />);

    expect(screen.getByText('ASX:BHP')).toBeVisible();
  });

  it('renders initial loading state', () => {
    mockedUseInfiniteScrollQuery.mockImplementation(() => ({
      isInitialLoading: true,
    }));
    render(<StocksList countryFilter="au" sortOrder="desc" />);

    expect(screen.getByTestId('loader')).toBeVisible();
  });

  it('renders error state', () => {
    mockedUseInfiniteScrollQuery.mockImplementation(() => ({
      isSuccess: false,
    }));
    render(<StocksList countryFilter="au" sortOrder="desc" />);

    expect(screen.getByText('Ups, something went wrong!')).toBeVisible();
  });
});
