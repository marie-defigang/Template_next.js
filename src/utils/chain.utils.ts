import { CHAIN_INFO, CHAINS_RPC, NATIVE_TOKEN } from '@constants/chain.constants';
import { CHAIN_ID } from '@constants/common.constants';

export const chainIdToHex = (chainId: CHAIN_ID): string => `0x${Number(chainId).toString(16)}`;

export const factoryNetworkParam = (chain: CHAIN_ID) => {
  const chainInfo = CHAIN_INFO[chain];
  const nativeToken = NATIVE_TOKEN[chain];
  return [
    {
      chainId: chainIdToHex(chain),
      chainName: chainInfo.walletName,
      nativeCurrency: {
        name: nativeToken.name,
        symbol: nativeToken.symbol,
        decimals: nativeToken.decimals,
      },
      rpcUrls: [CHAINS_RPC[chain]],
      blockExplorerUrls: [chainInfo.blockExplorerUrl],
    },
  ];
};
