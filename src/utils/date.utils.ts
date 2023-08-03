import moment from 'moment';

import { toBN } from '@utils/formaters.utils';

import { DATE_FORMAT } from '@constants/date.constants';

export const normalizeDuration = (durationInSeconds: string): string => {
  const duration = moment.duration(durationInSeconds, 'seconds');
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  let normalizedDuration = '';
  if (hours > 0) {
    normalizedDuration += `${hours}h `;
  }
  if (minutes > 0) {
    normalizedDuration += `${minutes}m `;
  }
  if (normalizedDuration.trim().length) {
    normalizedDuration = normalizedDuration.trim();
  }
  return normalizedDuration;
};

export const normalizeDurationToSec = (duration: string): string => {
  const durationArray = duration.split('');

  let durationToSec = '';
  if (durationArray[durationArray.length - 1] === 'm') {
    durationToSec = toBN(duration.split('m')[0]).times(60).toFixed(0);
  } else {
    durationToSec = toBN(duration.split('h')[0]).times(3600).toFixed(0);
  }

  return durationToSec;
};

export const convertTimestampToDate = (timestamp: number): string => {
  const date = moment.unix(timestamp);
  const formattedDate = date.format(DATE_FORMAT.YEAR_MONTH_HOURS_MINUTES_DATE);

  return formattedDate;
};

export const convertTimestampToFullDate = (timestamp: number): string => {
  const date = moment.unix(timestamp);
  const formattedDate = date.format(DATE_FORMAT.DAY_MONTH_YEAR_FULL_TIME);

  return formattedDate;
};

export const hasTimestampPassed = (endTime: number): boolean => {
  const currentTime = moment().unix();
  return currentTime > endTime;
};

export const convertISOStringToDate = (dateString: string): string => {
  const date = moment(dateString);
  const formattedDate = date.format(DATE_FORMAT.DAY_MONTH);

  return formattedDate;
};

export const getCloseTime = (duration: string): string =>
  moment().add(duration, 'seconds').format(DATE_FORMAT.DAY_MONTH_YEAR_TIME);

export const getTimeFromSec = (duration: string): string =>
  moment(Number(duration) * 1000).format(DATE_FORMAT.TIME);
