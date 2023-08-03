import { Network } from 'bitcoin-address-validation';

export type ConfigType = {
  API_URL: string;
  REDUX_DEBUG: boolean;
  RE_CAPTCHA_KEY: string;
  LANDING_URL: string;
  CABINET_URL: string;
  BTC_NETWORK: Network.testnet | Network.mainnet | Network.regtest;
  SENTRY_DSN: string;
  ENVIRONMENT: string;
  GOOGLE_TAG_ID: string;
  GOOGLE_TAG_MANAGER_CONTAINER_ID: string;
}
