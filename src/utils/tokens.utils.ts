import { ZERO_ADDRESS, CHAIN_ID } from '@constants/chain.constants';
import { NATIVE_TOKEN, TOKENS } from '@constants/tokens.constants';

import { Token } from '../types';

export function isAddressesEqual(address0: string, address1: string): boolean {
  if (!address0 || !address1) return false;
  return address0.toLowerCase() === address1.toLowerCase();
}

export const isTokenNativeByAddress = (address: string): boolean => address === ZERO_ADDRESS;

export function isTokenNative(token: Token, chainId: CHAIN_ID): boolean {
  if (!token) {
    return false;
  }
  return token === NATIVE_TOKEN[chainId];
}

export function findTokenByAddress(address: string, chainId: CHAIN_ID): Token {
  if (isAddressesEqual(address, ZERO_ADDRESS)) return NATIVE_TOKEN[chainId];
  return Object.values(TOKENS[chainId]).find((token) => isAddressesEqual(token.address, address));
}
