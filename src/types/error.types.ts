import { FIELD_NAMES } from '@constants/form.constants';

export type ResponseFieldsErrors = Partial<Record<FIELD_NAMES, { message: string }>>

export type ErrorMessageUI = {
  message: string,
};

export type MessagesErrorMap = { [key: string]: {
  message: string,
}};
