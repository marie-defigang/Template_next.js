import React, { createContext, FC, ReactNode } from 'react';

import { CURRENT_CHAIN_ID } from '@constants/common.constants';
import { DEFAULT_CHAIN_ID } from '@constants/chain.constants';
import useLocalStorage from '@hooks/useLocalStorage';

export type ChainContextType = {
  chainInStorage: number | undefined;
  setChainInStorage: (value: number) => void;
};

export const ChainContext = createContext<ChainContextType>({} as ChainContextType);

type Props = {
  children: ReactNode;
}

const ChainContextProvider: FC<Props> = ({ children }) => {
  const [chainInStorage, setChainInStorage] = useLocalStorage(CURRENT_CHAIN_ID, DEFAULT_CHAIN_ID);

  return (
    <ChainContext.Provider value={{ chainInStorage, setChainInStorage }}>
      {children}
    </ChainContext.Provider>
  );
};

export default ChainContextProvider;
