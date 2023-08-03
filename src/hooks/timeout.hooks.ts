import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { diffInTime, getSecFromMs } from '@helpers/date.helpers';

type IntervalType = ReturnType<typeof setInterval>;

export const useTimeout = (availableDate: string) => {
  const diff = diffInTime(availableDate, 's', false);
  const [seconds, setSeconds] = useState(getSecFromMs(diff));
  const [isAvailable, setIsAvailable] = useState(true);
  const interval: { current: IntervalType | null } = useRef(null);

  const stopTimer = useCallback(() => {
    const intervalEl = interval.current;
    if (intervalEl) { clearInterval(intervalEl); }
    interval.current = null;
    setIsAvailable(true);
  }, []);

  useEffect(() => () => stopTimer(), [stopTimer]);

  useEffect(() => {
    setSeconds(diff);
  }, [diff]);

  const runTimer = useCallback(() => {
    const intervalEl = interval.current;
    if (intervalEl) { clearInterval(intervalEl); }
    setIsAvailable(false);
    interval.current = setInterval(() => setSeconds((prevState) => prevState - 1), 1000);
  }, []);

  useEffect(() => {
    if (!(seconds <= 0 && interval.current)) {
      return;
    }
    stopTimer();
    setSeconds(diff);
  }, [diff, seconds, stopTimer]);

  return {
    awaitTime: seconds, runTimer, isAvailable,
  };
};
