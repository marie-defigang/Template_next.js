import getConfig from 'next/config';
import { ConfigType } from '../../config.type';

const { publicRuntimeConfig } = getConfig();

export const CONFIG: ConfigType = {
  ...publicRuntimeConfig,
};
