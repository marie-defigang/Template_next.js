import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import _ from 'lodash';
import { Connector } from '@web3-react/types';
import Web3 from 'web3';

import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2';

import { useChain } from '@hooks/useChain';
import { useWeb3React, Web3ContextType } from '@web3-react/core';

import { AVAILABLE_CHAINS_LIST, CHAINS_RPC, DEFAULT_CHAIN_ID } from '@constants/chain.constants';

import { useConnection } from '@hooks/useConnection';
import { ConnectionType } from '@constants/connectors.constants';
import { CHAIN_ID } from '@constants/common.constants';
import { BaseProvider, Web3Provider } from '@ethersproject/providers';
import EthereumProvider from '@walletconnect/ethereum-provider';
import { chainIdToHex } from '../../utils/chain.utils';
import { walletConnectV2Connection } from '../../connectors/connectors';

type Web3ContextTypeWithoutProvider<T extends BaseProvider = Web3Provider> = Omit<
Web3ContextType<T>,
'provider'
>;

type Web3ReactContextInterface = Web3ContextTypeWithoutProvider & {
  library: any;
  libraryByChainId?: (chainId: number) => any;
  activate: (connector: Connector, id?: number) => Promise<void>;
  deactivate: () => void;
  changeChain: (chainId: CHAIN_ID) => Promise<void>;
  chainId?: CHAIN_ID;
  loading: boolean;
};

export const Web3Context = createContext<Web3ReactContextInterface>(
  {} as Web3ReactContextInterface,
);

interface Props {
  children: ReactNode;
}

const Web3ContextProvider: FC<Props> = ({ children }) => {
  const {
    provider: library,
    chainId,
    account,
    connector: connectorWeb3,
    ...web3React
  } = useWeb3React();
  const { connectionInStorage } = useConnection();
  const { chainInStorage, setChainInStorage } = useChain();

  const [ethereum, setEthereum] = useState<EthereumProvider |(() => EthereumProvider)>();

  // const navigate = useNavigate();

  const [state, setState] = useState({
    chainId: Number(chainInStorage) ?? DEFAULT_CHAIN_ID,
    library,
  });

  const [loading, setLoading] = useState(false);

  // timer for getting to some time for checking wallet connection
  // set default provider if no wallet connects after timeout
  const connectTimer = useRef<NodeJS.Timeout>();

  // const { ethereum } = window as any;

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const { ethereum: ethereumProvider } = window;

      setEthereum(ethereumProvider as EthereumProvider);
    }
  }, []);

  useEffect(() => {
    // don't do anything if smth is loading(connecting/disonnecting)
    if (loading) return;

    if (chainId) {
      if (AVAILABLE_CHAINS_LIST.includes(chainId)) {
        if (connectTimer.current) clearTimeout(connectTimer.current);
        setState({
          chainId,
          library: _.cloneDeep(library),
        });
        setChainInStorage(chainId);
      } else {
        // TODO: FIX
        // navigate('/');
        setState({
          chainId: undefined,
          library: undefined,
        });
      }
    } else {
      if (connectTimer.current) clearTimeout(connectTimer.current);
      connectTimer.current = setTimeout(() => {
        // TODO redundant check?
        if (!chainId) {

          // const providerLink = new Web3.providers.HttpProvider(CHAINS_RPC[Number(chainInStorage)]);
          const providerLink = new Web3.providers.HttpProvider('https://arb1.arbitrum.io/rpc');
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const web3Provider = new Web3Provider(providerLink);
          setState({
            chainId: Number(chainInStorage),
            library: web3Provider,
          });
          setLoading(false);
        }
      }, 300);
    }
  }, [chainId, chainInStorage, loading, library]);

  const libraryByChainId = (id: CHAIN_ID) => {
    // const providerLink = new Web3({ uri: CHAINS_RPC[id] });
    // return new Web3Provider(providerLink);

    const rps = CHAINS_RPC[id];

    const providerLink = new Web3.providers.HttpProvider(rps);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new Web3Provider(providerLink);
  };

  useEffect(() => {
    if (ethereum) {
      if (ethereum instanceof EthereumProvider) {
        ethereum.once('chainChanged', () => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 0);
        });
      }
    }
  }, [ethereum, chainId]);

  const changeChain = useCallback(
    async (id: CHAIN_ID) => {
      if (account && ethereum) {
        setLoading(true);
        try {
          if (connectionInStorage === ConnectionType.INJECTED) {
            if (ethereum instanceof EthereumProvider) {
              await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainIdToHex(id) }],
              });
            }
          }

          await connectorWeb3.activate(id);
        } catch (err: any) {
          if (err.code === 4902) {
            if (connectionInStorage === ConnectionType.INJECTED) {
              if (ethereum instanceof EthereumProvider) {
                await ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: chainIdToHex(id) }],
                });
              }
            }
          } else {
            console.error(err);
          }
        } finally {
          setLoading(false);
        }
      }
    },
    [ethereum, account],
  );

  const activateHandler = useCallback(async (connector: Connector, id?: number) => {
    setLoading(true);
    try {
      if (connector instanceof WalletConnectV2) {
        await connector.activate(id);
      } else {
        await connector.activate();
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const deactivateHandler = useCallback(() => {
    setLoading(true);
    try {
      if (connectorWeb3?.deactivate) {
        void connectorWeb3.deactivate();
      } else {
        void connectorWeb3.resetState();
        walletConnectV2Connection.connector.deactivate();
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        ...web3React,
        connector: connectorWeb3,
        loading,
        library: state.library,
        chainId: state.chainId,
        changeChain,
        libraryByChainId,
        activate: activateHandler,
        deactivate: deactivateHandler,
        account,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
