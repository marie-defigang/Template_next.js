import isEmail from 'validator/lib/isEmail';

export const isEmailValid = (email: string) => isEmail(email);
