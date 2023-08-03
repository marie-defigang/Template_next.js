import BigNumber from 'bignumber.js';
import { BigNumber as BigNumberEthers } from 'ethers';

import { arrayFromN } from './batch.utils';

export type Numerable = number | string | BigNumber | BigNumberEthers;

export const toBN = (origVal: Numerable, dividerDecimals = 0): BigNumber => {
  const val = origVal instanceof BigNumberEthers ? origVal.toString() : origVal;
  if (Number.isNaN(Number(val)) || val === null) {
    return new BigNumber(val);
  }
  return val instanceof BigNumber
    ? dividerDecimals !== undefined
      ? val.div(new BigNumber(10).pow(dividerDecimals))
      : val
    : new BigNumber(val.toString()).div(new BigNumber(10).pow(dividerDecimals));
};

export const formatBNWithCommas = (
  val: Numerable,
  precision: Numerable = 2,
  dividerDecimals = undefined,
  lessSign = false,
) => {
  if (val === null || val === undefined) {
    return 'NaN';
  }
  if (Number.isNaN(Number(val))) {
    return 'NaN';
  }
  const numPrecision = Number(precision);
  const numVal = Number(toBN(val, dividerDecimals));

  const targetMinValue = 1 / 10 ** numPrecision;
  if (lessSign && numVal < targetMinValue && Number(val) > 0) {
    return `<0.${arrayFromN(numPrecision - 1)
      .map(() => '0')
      .join('')}1`;
  }

  return numVal.toLocaleString('en-US', {
    maximumFractionDigits: numPrecision,
    minimumFractionDigits: numPrecision,
  });
};

export const applyDecimals = (val: Numerable, decimals: number): BigNumber =>
  toBN(val).times(new BigNumber(10).pow(decimals));

export const removeDecimals = (val: Numerable, decimals: number): BigNumber => toBN(val, decimals);
