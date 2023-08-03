import * as yup from 'yup';
import { ERROR_MESSAGES } from '@constants/messages.constants';

export const serverUrlYup = yup
  .string()
  .required(ERROR_MESSAGES.REQUIRED);
