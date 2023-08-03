import React, {
  FC, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { Connector } from '@web3-react/types';
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';

import { useOrderedConnections } from '@hooks/useOrderedConnections';
import Web3ContextProvider from '@contexts/Web3Context';
import ChainContext from '@contexts/ChainContext';
import AuthorizationContext from '@contexts/AuthorizationContext';

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  const connections = useOrderedConnections();

  const connectors: [Connector, Web3ReactHooks][] = connections.map(({ hooks, connector }) => [
    connector,
    hooks,
  ]);

  const [index, setIndex] = useState(0);

  useEffect(() => setIndex((i) => i + 1), [connections]);

  const key = useMemo(
    () => `${connections.map((connection) => connection.getName()).join('-')}${index}`,
    [connections, index],
  );

  console.log(key, 'key');

  return (
    <ChainContext>
      {/* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */}
      <Web3ReactProvider connectors={connectors} key={key + new Date()}>
        <Web3ContextProvider>
          <AuthorizationContext>
            {children}
          </AuthorizationContext>
        </Web3ContextProvider>
      </Web3ReactProvider>
    </ChainContext>
  );
};

export default Providers;
