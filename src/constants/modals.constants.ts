export enum MODAL_TYPES {
  CONFIRM_MODAL = 'CONFIRM_MODAL',
  ADD_URL_MODAL = 'ADD_URL_MODAL',
  AUTH_MODAL = 'AUTH_MODAL',
  WRONG_NETWORK_MODAL = 'WRONG_NETWORK_MODAL',
}

export const INITIAL_MODAL_STATE = {
  current: null,
  props: null,
};

export enum MODAL_TITLES {
  CHANGE_LOGIN_PASSWORD = 'Change login password',
}

export enum MODAL_DESCRIPTIONS {
  CHANGE_NUMBER = 'To change the mobile phone number, you need to confirm the previous number and the new number by entering the SMS code.',
}
