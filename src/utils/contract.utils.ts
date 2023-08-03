import Web3 from 'web3';

import { BaseContract, EstimateGasOptions } from '@abi/types/types';
import {
  Affiliation,
  OptionCore,
  PermitPeriphery,
  OptionCoreConfiguration,
  OptionCoreUtilities,
  Referral,
  Claim,
  Fundraising,
} from '@abi/types';

import { CHAIN_ID, GAS_MULTIPLIER, GAS_PRICE_MULTIPLIER } from '@constants/chain.constants';

import { PropType, Token } from '../types';
import { TransactionReceipt } from '../web3.types';

import { toBN } from './formaters.utils';

import AffiliactionAbi from '@abi/affiliation.json';
import ClaimAbi from '@abi/claim.json';
import ReferralAbi from '@abi/referral.json';
import OptionCoreAbi from '@abi/OptionCore.json';
import FundraisingAbi from '@abi/fundraising.json';
import PermitPeripheryAbi from '@abi/PermitPeriphery.json';
import OptionCoreUtilitiesAbi from '@abi/OptionCoreUtilities.json';
import OptionCoreConfigurationAbi from '@abi/OptionCoreConfiguration.json';

import {
  AFFILIATION_ADDRESS,
  CLAIM_OPTIONS_ADDRESS,
  FUNDRAISING_ADDRESS,
  OPTIONS_CORE_ADDRESS,
  OPTIONS_CORE_CONFIGURATION_ADDRESS,
  OPTIONS_CORE_UTILITIES_ADDRESS,
  PERMIT_OPTIONS_ADDRESS,
  REFERRAL_ADDRESS,
} from '@constants/address.constants';

export async function web3SendTxWrap<
  C extends BaseContract,
  M extends keyof PropType<C, 'methods'>,
>(
  contract: C,
  methodName: M,
  params: any[],
  options: EstimateGasOptions,
  library: any,
  chainId?: number,
): Promise<TransactionReceipt> {
  const web3 = new Web3(library.provider);
  const gasPrice = await web3.eth.getGasPrice();
  const chainGasPrice = toBN(gasPrice).times(GAS_PRICE_MULTIPLIER[chainId]).toFixed(0);
  let adjustedGas;
  try {
    const gas = await contract.methods[methodName](...params).estimateGas({
      ...options,
      gasPrice: chainGasPrice,
    });
    adjustedGas = toBN(gas).times(GAS_MULTIPLIER[chainId]).toFixed(0);
  } catch (e) {
    console.log(e);
  }
  return new Promise((res, rej) => {
    contract.methods[methodName](...params)
      .send({ ...options, gas: adjustedGas, gasPrice: chainGasPrice })
      .once('receipt', async (receipt: TransactionReceipt) => {
        return res(receipt);
      })
      .on('error', (error) => {
        return rej(error);
      });
  });
}

type PermitDataType = {
  chainId: number;
  token: Token;
  account: string;
  amount: string;
  nonces: string;
  deadline: number;
};
export const generatePermitData = ({
  chainId,
  token,
  account,
  amount,
  nonces,
  deadline,
}: PermitDataType) => {
  const permitType = {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  const domainData = {
    name: token.name,
    version: '2',
    verifyingContract: token.address,
    chainId: chainId,
  };

  const permitData = {
    owner: account,
    spender: PERMIT_OPTIONS_ADDRESS[chainId],
    value: amount,
    nonce: nonces,
    deadline: deadline,
  };

  return { permitType, domainData, permitData };
};

export const parseSignature = (result) => {
  const signature = result.substring(2);
  const r = '0x' + signature.substring(0, 64);
  const s = '0x' + signature.substring(64, 128);
  const v = parseInt(signature.substring(128, 130), 16);

  return { r, s, v };
};

export const makeContract = <T = any>(library: any, abi: any, address: string): T => {
  const web3 = new Web3(library.provider);
  return new web3.eth.Contract(abi, address) as unknown as T;
};

export const makeAffiliationContract = (library: any, chainId: CHAIN_ID) => {
  return makeContract<Affiliation>(library, AffiliactionAbi, AFFILIATION_ADDRESS[chainId]);
};

export const makeReferralContract = (library: any, chainId: CHAIN_ID) => {
  return makeContract<Referral>(library, ReferralAbi, REFERRAL_ADDRESS[chainId]);
};

export const makeOrderCoreContract = (library: any, chainId: CHAIN_ID) => {
  return makeContract<OptionCore>(library, OptionCoreAbi, OPTIONS_CORE_ADDRESS[chainId]);
};

export const makeOrderCoreUtilitiesContract = (library: any, chainId: CHAIN_ID) => {
  return makeContract<OptionCoreUtilities>(
    library,
    OptionCoreUtilitiesAbi,
    OPTIONS_CORE_UTILITIES_ADDRESS[chainId],
  );
};

export const makeOrderCoreConfigurationContract = (library: any, chainId: CHAIN_ID) => {
  return makeContract<OptionCoreConfiguration>(
    library,
    OptionCoreConfigurationAbi,
    OPTIONS_CORE_CONFIGURATION_ADDRESS[chainId],
  );
};

export const makePermitContract = (library: any, chainId: CHAIN_ID) => {
  return makeContract<PermitPeriphery>(
    library,
    PermitPeripheryAbi,
    PERMIT_OPTIONS_ADDRESS[chainId],
  );
};

export const makeClaimContract = (library: any, chainId: CHAIN_ID) => {
  return makeContract<Claim>(library, ClaimAbi, CLAIM_OPTIONS_ADDRESS[chainId]);
};

export const makeFundraisingContract = (library: any, chainId: CHAIN_ID) => {
  return makeContract<Fundraising>(library, FundraisingAbi, FUNDRAISING_ADDRESS[chainId]);
};
