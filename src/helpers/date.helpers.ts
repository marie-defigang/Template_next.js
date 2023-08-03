import dayjs, { OpUnitType } from 'dayjs';
import { DATE_FORMAT } from '@constants/date.constants';

export const diffInTime = (
  date: string, unitType: OpUnitType = 'ms', abs = true,
) => (abs ? Math.abs(dayjs(new Date(date)).diff(new Date(), unitType)) : dayjs(new Date(date)).diff(new Date(), unitType));

export const getSecFromMs = (ms: number): number => Number((ms / 1000).toFixed(0));

export const addTimeToCurrentDate = (value: number, unit: dayjs.ManipulateType) => dayjs(new Date().toISOString()).add(
  value, unit,
).format();

export const formatDate = (date: string | number, format = DATE_FORMAT.YEAR_MONTH_DATE_TIME) => dayjs(new Date(date)).format(format);
