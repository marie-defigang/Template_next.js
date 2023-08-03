import { FieldErrors } from 'react-hook-form';
import { ApiError } from '@768-gladwin-tech/client-sdk';
import { FIELD_NAMES } from '@constants/form.constants';
import { ERROR_MESSAGES_FOR_UI, UNKNOWN_ERROR } from '@constants/error.constants';
import { ERROR_MESSAGES } from '@constants/messages.constants';
import { ErrorMessageUI, MessagesErrorMap, ResponseFieldsErrors } from '../types/error.types';
import { ApiErrorBodyType } from '../types/api.types';

export const getFormOrResponseError = (
  formErrors: FieldErrors<Record<string, string>>,
  responseErrors: ResponseFieldsErrors | null,
  fieldName: FIELD_NAMES,
): string | null => (
  formErrors[fieldName]?.message || (responseErrors && fieldName in responseErrors && responseErrors[fieldName]?.message) || null
);

export const getAPIErrorMessage = (body: ApiErrorBodyType): string => body?.errors?.[0]?.message || UNKNOWN_ERROR;

export const logApiError = (error: ApiError) => {
  console.log(error.body || error.message);
};

export const getErrorMessageForUI = (error: ApiError): ErrorMessageUI => {
  const { body } = error;
  const errorObj = ERROR_MESSAGES_FOR_UI[getAPIErrorMessage(body as ApiErrorBodyType)] || ERROR_MESSAGES_FOR_UI[UNKNOWN_ERROR];
  if (errorObj.message === ERROR_MESSAGES.UNKNOWN_ERROR) logApiError(error);
  return errorObj;
};

export const prepareResponseErrors = (body: ApiErrorBodyType, customErrors: MessagesErrorMap = {}): ResponseFieldsErrors => (
  body?.errors?.reduce((map, item) => {
    if (item.field in map) return map;
    return {
      ...map,
      [item.field]: { ...ERROR_MESSAGES_FOR_UI, ...customErrors }[item.message] || ERROR_MESSAGES_FOR_UI[UNKNOWN_ERROR],
    };
  }, {})
) || {};
