import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { Actions, Connector } from '@web3-react/types';

import { MetaMask } from '@web3-react/metamask';

import { ConnectionType } from '@constants/connectors.constants';
import { DEFAULT_CHAIN_ID } from '@constants/chain.constants';
import { CHAIN_ID } from '@constants/common.constants';
import { WalletConnectV2 } from './connection/WalletConnectV2';

export interface Connection {
  getName(): string;
  connector: Connector;
  hooks: Web3ReactHooks;
  type: ConnectionType;
  overrideActivate?: (chainId?: CHAIN_ID) => boolean;
}

function onError(error: Error) {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.debug(`web3-react error: ${error}`);
}

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions, onError }),
);

export const injectedConnection: Connection = {
  getName: () => 'MetaMask',
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
};

export const walletConnectV2Connection: Connection = new (class implements Connection {

  private initializer = (actions: Actions, defaultChainId = DEFAULT_CHAIN_ID) => new WalletConnectV2({ actions, defaultChainId, onError });

  type = ConnectionType.WALLET_CONNECT_V2;

  getName = () => 'WalletConnect';

  private _connector = initializeConnector<WalletConnectV2>(this.initializer);

  overrideActivate = (chainId?: CHAIN_ID) => {
    // Always re-create the connector, so that the chainId is updated.
    this._connector = initializeConnector((actions) => this.initializer(actions, chainId));
    return false;
  };

  get connector() {
    return this._connector[0];
  }

  get hooks() {
    return this._connector[1];
  }

})();
