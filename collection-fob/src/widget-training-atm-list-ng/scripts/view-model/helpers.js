/* eslint-disable import/prefer-default-export */
import { E_AUTH, E_CONNECTIVITY, E_USER, E_UNEXPECTED } from 'lib-bb-model-errors';

const errorMessages = {
  [E_AUTH]: 'atm-list.model.error.auth',
  [E_CONNECTIVITY]: 'atm-list.model.error.connectivity',
  [E_USER]: 'atm-list.model.error.user',
  [E_UNEXPECTED]: 'atm-list.model.error.unexpected',
};

/**
 * @name uiError
 *
 * @inner
 * @type {function}
 * @description Creates an error object for template
 * @param {object} modelError Error object
 * @returns {{message: string}}
 */
export const uiError = (modelError) => {
  let message = '';

  if (modelError && modelError.code) {
    message = errorMessages[modelError.code];
  }

  return { message };
};
