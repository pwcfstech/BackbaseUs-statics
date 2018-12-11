/* eslint-disable import/prefer-default-export */
import { E_AUTH, E_CONNECTIVITY, E_USER, E_UNEXPECTED } from 'lib-bb-model-errors';

const errorMessages = {
  [E_AUTH]: 'hello-world.model.error.auth',
  [E_CONNECTIVITY]: 'hello-world.model.error.connectivity',
  [E_USER]: 'hello-world.model.error.user',
  [E_UNEXPECTED]: 'hello-world.model.error.unexpected',
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
