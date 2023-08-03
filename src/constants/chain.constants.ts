// const arbitrum: string = require('@assets/chains/arbitrum.svg').default;

import {
  ChainInfo, ChainMapped, Token, TokenMapped,
} from 'src/types/chain.types';
import { CHAIN_ID, TOKEN_SYMBOL } from './common.constants';

export const AVAILABLE_CHAINS_LIST = [CHAIN_ID.ARBITRUM];

export const DEFAULT_CHAIN_ID = CHAIN_ID.ARBITRUM;

// TODO add array of rpcs?
export const CHAINS_RPC = {
  [CHAIN_ID.ARBITRUM]: 'https://arb1.arbitrum.io/rpc',
  [CHAIN_ID.ARBITRUM_TESTNET]: 'https://goerli-rollup.arbitrum.io/rpc',
};

export const CHAIN_INFO: ChainMapped<ChainInfo> = {
  [CHAIN_ID.ARBITRUM]: {
    // logo: arbitrum,
    logo: '',
    name: 'ARBITRUM',
    walletName: 'Arbitrum One Mainnet',
    blockExplorerUrl: 'https://arbiscan.io',
  },
  [CHAIN_ID.ARBITRUM_TESTNET]: {
    // logo: arbitrum,
    logo: '',
    name: 'ARBITRUM_TESTNET',
    walletName: 'Arbitrum TestNet',
    blockExplorerUrl: 'https://goerli.arbiscan.io',
  },
};

export const MULTI_CALLS = {
  [CHAIN_ID.ARBITRUM]: '0xa8bA71A659e5964644c2D9455465B8204BE20CC1',
  [CHAIN_ID.ARBITRUM_TESTNET]: '0xaefa5919e7e239c0e494bc7cc34d1b8e785366a5',
};

export const TRX_LINK = {
  [CHAIN_ID.ARBITRUM]: 'https://arbiscan.io/tx/',
};

export const WALLET_LINK = {
  [CHAIN_ID.ARBITRUM]: 'https://arbiscan.io/address/',
};

export const GAS_MULTIPLIER = {
  [CHAIN_ID.ARBITRUM]: 1.15,
  [CHAIN_ID.ARBITRUM_TESTNET]: 1.15,
};

export const GAS_PRICE_MULTIPLIER = {
  [CHAIN_ID.ARBITRUM]: 1,
  [CHAIN_ID.ARBITRUM_TESTNET]: 1,
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const DEADLINE = 60;
export const ACCEPT_DEADLINE = 20;

export const NATIVE_TOKEN: ChainMapped<Token> = {
  [CHAIN_ID.ARBITRUM]: new Token(CHAIN_ID.ARBITRUM, ZERO_ADDRESS, 18, TOKEN_SYMBOL.ETH),
  [CHAIN_ID.ARBITRUM_TESTNET]: new Token(
    CHAIN_ID.ARBITRUM_TESTNET,
    ZERO_ADDRESS,
    18,
    TOKEN_SYMBOL.ETH,
  ),
};

type TokenList = ChainMapped<TokenMapped>;

export const OPTION_STABLE = new Token(
  CHAIN_ID.ARBITRUM,
  '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  6,
  TOKEN_SYMBOL.USDC,
  false,
  'USD Coin',
);

export const TOKENS: TokenList = {
  [CHAIN_ID.ARBITRUM]: {
    [TOKEN_SYMBOL.ETH]: NATIVE_TOKEN[CHAIN_ID.ARBITRUM],
    [TOKEN_SYMBOL.WETH]: new Token(
      CHAIN_ID.ARBITRUM,
      '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      18,
      TOKEN_SYMBOL.WETH,
    ),
    [TOKEN_SYMBOL.USDC]: new Token(
      CHAIN_ID.ARBITRUM,
      '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
      6,
      TOKEN_SYMBOL.USDC,
    ),
    [TOKEN_SYMBOL.USDT]: new Token(
      CHAIN_ID.ARBITRUM,
      '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
      6,
      TOKEN_SYMBOL.USDT,
    ),
  },
  [CHAIN_ID.ARBITRUM_TESTNET]: {},
};

export const MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
