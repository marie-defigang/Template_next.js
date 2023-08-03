import { ERROR_MESSAGES } from '@constants/messages.constants';
import { MAX_ACCOUNT_LENGTH, MIN_ACCOUNT_LENGTH } from '@constants/account.constants';

export const accountLengthError = ERROR_MESSAGES.ACCOUNT_LENGTH.replace('[min]', String(MIN_ACCOUNT_LENGTH))
  .replace('[max]', String(MAX_ACCOUNT_LENGTH));
