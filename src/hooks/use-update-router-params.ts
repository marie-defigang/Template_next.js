import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useDebounce } from '@hooks/use-debounce';
import useUpdateEffect from '@hooks/use-update-effect';
import { DEBOUNCE_DELAY } from '@constants/global.constants';

export const useUpdateRouterParams = <T, >(
  router: NextRouter,
  setParams: Dispatch<SetStateAction<T>>,
  params: Record<string, string | number>,
  search: string,
  setCurrentPage: Dispatch<SetStateAction<number>>,
) => {
  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);
  const searchQuery = debouncedSearch && { search: debouncedSearch };

  useUpdateEffect(() => {
    router.push({
      query: {
        ...params,
        ...searchQuery,
      },
    }).catch(null);
  }, [params, debouncedSearch]);

  useUpdateEffect(() => {
    setParams((items) => ({
      ...items,
    }));
    setCurrentPage(1);
  }, [debouncedSearch, setParams]);

  return { debouncedSearch };
};
