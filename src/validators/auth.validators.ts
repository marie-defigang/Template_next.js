import * as yup from 'yup';
import { isEmailValid } from '@helpers/validate.helpers';
import { ERROR_MESSAGES } from '@constants/messages.constants';
import { FIELD_NAMES } from '@constants/form.constants';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, PASSWORD_SPACES_REGEXP } from '@constants/auth.constants';

export const emailYup = yup.string()
  .required(ERROR_MESSAGES.EMAIL_REQUIRED)
  .test('email', ERROR_MESSAGES.INVALID_EMAIL,
    (value) => isEmailValid(value || ''));

const passwordIncorrectError = ERROR_MESSAGES.PASSWORD_INCORRECT.replace('[min]', String(MIN_PASSWORD_LENGTH))
  .replace('[max]', String(MAX_PASSWORD_LENGTH));

export const passwordYup = yup.string().required(ERROR_MESSAGES.PASSWORD_REQUIRED)
  .min(MIN_PASSWORD_LENGTH, passwordIncorrectError)
  .max(MAX_PASSWORD_LENGTH, passwordIncorrectError)
  .matches(PASSWORD_SPACES_REGEXP, ERROR_MESSAGES.PASSWORD_SPACES);

export const signInSchema = yup.object().shape({
  [FIELD_NAMES.EMAIL]: emailYup,
  [FIELD_NAMES.PASSWORD]: passwordYup,
});
