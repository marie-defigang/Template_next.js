import { Connector } from '@web3-react/types';

import { ConnectionType } from '@constants/connectors.constants';

import { injectedConnection, walletConnectV2Connection } from './connectors';

export const getConnections = () => [walletConnectV2Connection, injectedConnection];

export const getConnection = (c: Connector | ConnectionType) => {
  if (c instanceof Connector) {
    const connection = getConnections().find((connectionValue) => connectionValue.connector === c);
    if (!connection) {
      throw Error('unsupported connector');
    }
    return connection;
  }
  switch (c) {
    case ConnectionType.INJECTED:
      return injectedConnection;
    case ConnectionType.WALLET_CONNECT_V2:
      return walletConnectV2Connection;
  }
};
