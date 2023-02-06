import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

const TIMEOUT_DELAY = 500;

export function useInfiniteScrollQuery<T>({
  query: useQuery,
}: {
  query: () => UseInfiniteQueryResult<T>;
}) {
  const observerRef = useRef<IntersectionObserver>();
  const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, TIMEOUT_DELAY);
  const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout);

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useQuery();

  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0];

      if (target.isIntersecting) {
        clearTimeout(loadMoreTimeoutRef.current);

        // this timeout debounces the intersection events
        loadMoreTimeoutRef.current = setTimeout(() => {
          fetchNextPage();
        }, TIMEOUT_DELAY);
      }
    },
    [loadMoreTimeoutRef]
  );

  const observerCallback = useCallback(
    (el: HTMLDivElement) => {
      if (!isInitialLoading && (isFetchingNextPage || !hasNextPage)) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      });

      if (el) observerRef.current.observe(el);
    },
    [handleObserver]
  );

  return {
    observerCallback,
    data,
    isFetchingNextPage,
    isSuccess,
    hasNextPage,
    isInitialLoading,
  };
}
