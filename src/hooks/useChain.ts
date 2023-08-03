import { useContext } from 'react';

import { ChainContext, ChainContextType } from '@contexts/ChainContext';

export const useChain = (): ChainContextType => useContext(ChainContext);
