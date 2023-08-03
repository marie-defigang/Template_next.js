import { useMemo } from 'react';

import { ConnectionType } from '@constants/connectors.constants';
import { useConnection } from './useConnection';
import { getConnection } from '../connectors';

const SELECTABLE_WALLETS = [ConnectionType.WALLET_CONNECT_V2, ConnectionType.INJECTED];

export const useOrderedConnections = () => {
  const { connectionInStorage } = useConnection();

  return useMemo(() => {
    const orderedConnectionTypes: ConnectionType[] = [];

    if (connectionInStorage) {
      orderedConnectionTypes.push(connectionInStorage);
    }
    orderedConnectionTypes.push(
      ...SELECTABLE_WALLETS.filter((wallet) => wallet !== connectionInStorage),
    );

    return orderedConnectionTypes.map((connectionType) => getConnection(connectionType));
  }, [connectionInStorage]);
};
