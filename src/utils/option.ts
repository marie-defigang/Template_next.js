import BigNumber from 'bignumber.js';
import { get } from 'lodash';

import { applyDecimals, removeDecimals, toBN } from '@utils/formaters.utils';

import { OPTION_STABLE } from '@constants/tokens.constants';
import { APP_URL, DEFAULT_OPTION_DECIMALS } from '@constants/common.constants';
import {
  DEFAULT_PREDICTION_VALUES,
  DIRECTION_TITLE,
  DIRECTION_TYPE,
} from '@constants/order.constants';

export const sumField = <T>(data: T[], field: string): BigNumber => {
  return data.reduce((sum, item) => {
    const value = new BigNumber(get(item, field, 0));
    return sum.plus(value);
  }, new BigNumber(0));
};

type InputsValue<T> = { [key: number]: T };

export const generateInitialState = <T>(amountOrders: number, initialValue: T): InputsValue<T> => {
  const initialInputsValue: InputsValue<T> = {};

  for (let i = 0; i < amountOrders; i++) {
    initialInputsValue[i] = initialValue;
  }

  return initialInputsValue;
};

export const calculateMaxAvailableValue = (balance, ...values) => {
  const balanceWithDecimals = toBN(balance, OPTION_STABLE.decimals);
  const subtractedValue = values.reduce(
    (result, value) => result.minus(toBN(value)),
    balanceWithDecimals,
  );
  return subtractedValue.toNumber();
};

export const getOptionDuration = (days?: number, hours?: number, minutes?: number) =>
  `${days ? days + 'd ' : ''}${hours ? hours + 'h ' : ''}${minutes ? minutes + 'm' : ''}`.trim();

export const getContractPercent = (percent: number): string => {
  return applyDecimals(toBN(percent).plus(100).div(100), DEFAULT_OPTION_DECIMALS).toFixed(0);
};

export const getNormalizePercent = (percent: number | string, direction: string): string => {
  if (direction === DIRECTION_TITLE[DIRECTION_TYPE.UP].toLowerCase()) {
    return removeDecimals(toBN(percent).times(100), DEFAULT_OPTION_DECIMALS).minus(100).toFixed(2);
  }
  if (direction === DIRECTION_TITLE[DIRECTION_TYPE.DOWN].toLowerCase()) {
    const x = removeDecimals(toBN(percent).times(100), DEFAULT_OPTION_DECIMALS);
    return x.minus(100).toFixed(2);
  }
};

export const getFinalPercentForUi = (percent: number | string, direction: string): string => {
  if (DEFAULT_PREDICTION_VALUES.includes(String(percent))) {
    return '-';
  }

  return `${getNormalizePercent(percent, direction)}%`;
};

export const getFinalPercentForShare = (
  percent: number | string,
  direction: string,
  price: string,
): string => {
  if (DEFAULT_PREDICTION_VALUES.includes(String(percent))) {
    return `${direction === DIRECTION_TYPE.UP ? 'Above' : 'Below'} ${price}`;
  }

  return `${getNormalizePercent(percent, direction)}%`;
};

export const getFormattedTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let formattedHours = '';
  if (hours > 0) {
    formattedHours = `${hours}h`;
  }

  let formattedMinutes = '';
  if (remainingMinutes > 0) {
    formattedMinutes = `${remainingMinutes}m`;
  }

  return `${formattedHours} ${formattedMinutes}`.trim();
};

export const getNormalizedRate = (rate: string) =>
  toBN(rate).plus(applyDecimals(1, DEFAULT_OPTION_DECIMALS)).toFixed(0);

export const getRateForContract = (rate: number) => toBN(rate).minus(1).toFixed(2);

export const getShareTextForBuying = ({
  oracleName,
  percent,
  duration,
  direction,
  isPredictMode,
}) =>
  `I just bought an  Option on ${oracleName} being ${
    isPredictMode
      ? DIRECTION_TYPE.UP === direction.toLowerCase()
        ? 'Up'
        : 'Down'
      : direction === DIRECTION_TYPE.UP
      ? `+${percent}`
      : { percent }
  } in ${duration} on ${APP_URL}!`;
