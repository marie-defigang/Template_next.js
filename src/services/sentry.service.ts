import * as Sentry from '@sentry/react';
import { CONFIG } from '@constants/config.constants';

export const initSentry = () => {
  if (!CONFIG.SENTRY_DSN) { return; }

  Sentry.init({
    dsn: CONFIG.SENTRY_DSN,
    environment: CONFIG.ENVIRONMENT,
  });

  Sentry.setTag('repository', 'PegaPool.Admin');
};
