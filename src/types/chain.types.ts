import BigNumber from 'bignumber.js';
import { CHAIN_ID, TOKEN_SYMBOL } from '@constants/common.constants';

export class Token {

  chainId: number;

  address: string;

  decimals: number;

  symbol: string;

  name: string | undefined;

  isLP: boolean | undefined;

  constructor(
    chainId: number,
    address: string,
    decimals: number,
    symbol: string,
    isLP?: boolean,
    name?: string,
  ) {
    this.chainId = chainId;
    this.address = address.toLowerCase();
    this.decimals = decimals;
    this.symbol = symbol;
    this.name = name;
    this.isLP = isLP;
  }

}

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type TokensInfoType = {
  balance: BigNumber;
  decimals: string;
  name: string;
  symbol: string;
  weight: string;
  usdPrice: BigNumber;
  weightInBase: BigNumber;
  currentWeight: BigNumber;
};

export type FundsInfoType = {
  address: string;
  logo: string;
  name: string;
  symbol: string;
  decimals: number; // etf token decimals
  tokensCount: string; // number of fund tokens
  divider: string;
  base: string; // base token for swap etf fund
  baseDecimals: number; // decimals of base token
  basePricesInUsd: BigNumber; // price in usd base token
  tvlInBase: string; // tlv in base token
  tvlInUsd: BigNumber; // tvl in usd
  dexFactory: string;
  pathToStable: string[];
  totalSupply: BigNumber;
  tokensList: string[];
  tokensInfo: TokensInfoType[];
  fundPrice?: BigNumber;
  tokensIn?: string[];
  tokensOut?: string[];
};

export type FundConfig = {
  name: string;
  symbol: string;
  address: string;
  dexFactory: string;
  pathToStable: TOKEN_SYMBOL[]; // TODO change to Token[]
  tokensIn: TOKEN_SYMBOL[]; // TODO change to Token[]
  tokensOut: TOKEN_SYMBOL[]; // TODO change to Token[]
  logo: string;
};

export type ChainInfo = {
  logo: string;
  name: string;
  walletName: string;
  blockExplorerUrl: string;
};

export type ChainMapped<T = never> = {
  [chainId in CHAIN_ID]: T;
};

export type TokenMapped = {
  [chainId in TOKEN_SYMBOL]?: Token;
};
