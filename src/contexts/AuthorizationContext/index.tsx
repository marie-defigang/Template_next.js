import React, {
  createContext, FC, ReactNode, useCallback, useEffect, useState,
} from 'react';

import { useWeb3 } from '@hooks/useWeb3';
import { useModals } from '@hooks/modals.hooks';
import { useConnection } from '@hooks/useConnection';
import { useEffectUpdate } from '@hooks/useEffectUpdate';

import { MODAL_TYPES } from '@constants/modals.constants';
import { ConnectionType } from '@constants/connectors.constants';

import { injectedConnection, walletConnectV2Connection } from 'src/connectors/connectors';

type AuthContextType = {
  connectMetaMask: () => void;
  connectWalletConnect: (id: number) => void;
  logOut: () => void;
};

export const AuthorizationContext = createContext<AuthContextType>({} as AuthContextType);

interface Props {
  children: ReactNode;
}
const AuthorizationProvider: FC<Props> = ({ children }) => {
  const { show } = useModals();
  const { setConnectionInStorage, connectionInStorage } = useConnection();
  const {
    activate, deactivate, chainId, connector, account,
  } = useWeb3();

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isNeedUpdate, setUpdate] = useState(false);

  const connectMetaMask = useCallback(async () => {
    try {
      await injectedConnection.connector.activate();

      setConnectionInStorage(ConnectionType.INJECTED);
    } catch (e) {
      console.error(e);
      setConnectionInStorage('');
    }
  }, []);

  const connectWalletConnect = useCallback(async (id: number) => {
    try {
      // overwrites the chain id in constructor
      walletConnectV2Connection.overrideActivate(id);
      await activate(walletConnectV2Connection.connector, id);

      setUpdate(true);
      setConnectionInStorage(ConnectionType.WALLET_CONNECT_V2);
    } catch (e) {
      console.error(e);
      setConnectionInStorage('');
    }
  }, []);

  const logOut = useCallback(() => {
    deactivate();
    setConnectionInStorage('');
  }, []);

  useEffect(() => {
    (async () => {
      setIsWalletConnected(false);
      if (connectionInStorage === ConnectionType.INJECTED) {
        await connectMetaMask();
      }
      if (connectionInStorage === ConnectionType.WALLET_CONNECT_V2) {
        // walletConnectV2Connection.connector.connectEagerly();
        if (walletConnectV2Connection?.connector?.connectEagerly) {
          // eslint-disable-next-line no-void
          void walletConnectV2Connection.connector.connectEagerly();
        }

      }
      setIsWalletConnected(true);
    })();
  }, []);

  const handleWrongNetwork = useCallback(() => {
    if (!show) return;
    show(MODAL_TYPES.WRONG_NETWORK_MODAL);
  }, []);

  useEffect(() => {
    if (isNeedUpdate) {
      (async () => {
        // await connector.connectEagerly(walletConnectV2Connection.connector);
        if (connector?.connectEagerly) {
          await connector.connectEagerly(walletConnectV2Connection.connector);
        }
        setUpdate(false);
      })();
    }
  }, [isNeedUpdate, chainId]);

  useEffectUpdate(() => {
    if (!account) {
      setConnectionInStorage('');
    }
  }, []);

  return (
    <AuthorizationContext.Provider value={{ connectMetaMask, logOut, connectWalletConnect }}>
      {isWalletConnected ? children : <div />}
      {!chainId && handleWrongNetwork()}
    </AuthorizationContext.Provider>
  );
};

export default AuthorizationProvider;
