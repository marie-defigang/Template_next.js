export const DEFAULT_CRITERIA_MODE = 'all';

export enum REVALIDATE_MODE {
  ON_CHANGE = 'onChange',
  ON_TOUCHED = 'onTouched'
}

export const DEFAULT_REVALIDATE_MODE = REVALIDATE_MODE.ON_TOUCHED;

export enum FIELD_NAMES {
  EMAIL = 'email',
  REMEMBER = 'rememberMe',
  PHONE = 'phoneNumber',
  PHONE_CONFIRM_CODE = 'phoneConfirmationCode',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  GROUP_NAME = 'groupName',
  URL = 'url',

}

export enum DEFAULT_INPUT_TYPES {
  PASSWORD = 'PASSWORD',
  TEXT = 'TEXT'
}
