import { DIRECTION_TYPE } from '@constants/order.constants';

export const removeUndefined = (obj: any, options?: { removeEmptyStrings: boolean }) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') removeUndefined(obj[key]);
    else if (obj[key] === undefined) delete obj[key];
    else if (options?.removeEmptyStrings && obj[key] === '') delete obj[key];
  });
};

export const copyTextToClipboard = (text) => navigator.clipboard.writeText(text);

export const generateArrayTime = () => {
  const arr = [];

  for (let minutes = 15; minutes <= 1440; minutes += 15) {
    let name;
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (hours === 24) {
        name = '1d';
      } else if (remainingMinutes === 0) {
        name = `${hours}h`;
      } else {
        name = `${hours}h ${remainingMinutes}m`;
      }
    } else {
      name = `${minutes}m`;
    }
    arr.push({
      name,
      value: minutes,
    });
  }

  return arr;
};

export const getPercentageOptions = (direction: DIRECTION_TYPE) => {
  let values;

  if (direction.toLowerCase() === DIRECTION_TYPE.UP) {
    values = [0.1, 0.25, 0.5, 1.0, 3.0, 5.0];
  }

  if (direction.toLowerCase() === DIRECTION_TYPE.DOWN) {
    values = [-0.1, -0.25, -0.5, -1.0, -3.0, -5.0];
  }

  const arr = [];

  for (let i = 0; i < values.length; i++) {
    arr.push({
      name: `${values[i]}%`,
      value: values[i],
    });
  }

  return arr;
};
