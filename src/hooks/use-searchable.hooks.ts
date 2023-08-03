import { useMemo } from 'react';
import { ESCAPE_SPECIAL_CHARACTERS_REGEXP } from '@constants/global.constants';

const useSearchable = <T>(
  data: T[],
  searchText: string,
  searchProps: (item: T) => string[],
) => useMemo(() => {
  const finalSearchText = searchText.replace(ESCAPE_SPECIAL_CHARACTERS_REGEXP, '\\$&');
  const regex = new RegExp(finalSearchText, 'i');
  return data?.filter((item) => searchProps(item).some((sp) => regex.test(sp)));
}, [data, searchText, searchProps]);

export default useSearchable;
