import { WalletConnect, WalletConnectConstructorArgs } from '@web3-react/walletconnect-v2';

import { AVAILABLE_CHAINS_LIST, CHAINS_RPC } from '@constants/chain.constants';
import { API_KEY_WALLET_CONNECT_V2 } from '@constants/api.constants';

export class WalletConnectV2 extends WalletConnect {

  ANALYTICS_EVENT = 'Wallet Connect QR Scan';

  constructor({
    actions,
    defaultChainId,
    qrcode = true,
    onError,
  }: Omit<WalletConnectConstructorArgs, 'options'> & { defaultChainId: number; qrcode?: boolean }) {
    // const darkmode = Boolean(window.matchMedia('(prefers-color-scheme: dark)'));
    super({
      actions,
      options: {
        projectId: API_KEY_WALLET_CONNECT_V2,
        chains: [defaultChainId],
        optionalChains: AVAILABLE_CHAINS_LIST,
        showQrModal: qrcode,
        rpcMap: CHAINS_RPC,
        // as of 6/16/2023 there are no docs for `optionalMethods`
        // this set of optional methods fixes a bug we encountered where permit2 signatures were never received from the connected wallet
        // source: https://uniswapteam.slack.com/archives/C03R5G8T8BH/p1686858618164089?thread_ts=1686778867.145689&cid=C03R5G8T8BH
        optionalMethods: ['eth_signTypedData', 'eth_signTypedData_v4', 'eth_sign'],
        qrModalOptions: {
          desktopWallets: undefined,
          enableExplorer: true,
          explorerExcludedWalletIds: undefined,
          explorerRecommendedWalletIds: undefined,
          mobileWallets: undefined,
          privacyPolicyUrl: undefined,
          termsOfServiceUrl: undefined,
          // themeMode: darkmode ? 'dark' : 'light',
          themeVariables: {
            '--wcm-font-family': '"Inter custom", sans-serif',
            '--wcm-z-index': '1060',
          },
          walletImages: undefined,
        },
      },
      onError,
    });
  }

  activate(chainId?: number) {
    return super.activate(chainId);
  }

}
