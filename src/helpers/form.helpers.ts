import { FormEvent } from 'react';

export const sliceEventValueByMaxLength = <T extends FormEvent, R extends HTMLInputElement = HTMLInputElement>(
  e: T,
  maxLength: number,
): T => (
  ({ ...e, target: { ...e.target, value: (<R>e.target).value.slice(0, maxLength) } })
);

export const replaceEventValueByTwoDecimalPlaces = <T extends FormEvent, R extends HTMLInputElement = HTMLInputElement>(
  e: T,
): T => (
  ({ ...e, target: { ...e.target, value: (<R>e.target).value.replace(/(\.\d{2})\d+/g, '$1') } })
);

export const getEventValueByNumericFraction = <T extends FormEvent, R extends HTMLInputElement = HTMLInputElement>(
  e: T,
): T => {
  const value = (<R>e.target).value
    .replace(/[^\d.,]/g, '')
    .replace(/,/g, '.')
    .replace(/\.{2,}/g, '.')
    .replace(/(\.\d+)\./g, '$1');
  return ({ ...e, target: { ...e.target, value } });
};
