import React, { createContext, FC } from 'react';
import { CONNECTION_TYPE, ConnectionType } from '@constants/connectors.constants';
import useLocalStorage from '@hooks/useLocalStorage';

export type ConnectionContextType = {
  connectionInStorage: ConnectionType | string;
  setConnectionInStorage: (value: ConnectionType | string) => void;
};

export const ConnectionContext = createContext<ConnectionContextType>({
} as ConnectionContextType);

type Props = {
  children: React.ReactNode
}
const ConnectionProvider: FC<Props> = ({ children }) => {
  const [connectionInStorage, setConnectionInStorage] = useLocalStorage<ConnectionType | string>(CONNECTION_TYPE, '');

  return (
    <ConnectionContext.Provider value={{ connectionInStorage, setConnectionInStorage }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export default ConnectionProvider;
