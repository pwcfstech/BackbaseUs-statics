import { uiError } from './helpers';
export default (stateContainer) => ({
  /**
   * @name ViewModel#beforeList
   * @type {function}
   * @description Amend the view to inform the user the list is being loaded
   * @return {ViewState} The new state of the widget
   */
  beforeList: stateContainer.createAction((current) => ({
    ...current,
    isLoading: true,
  })),

  /**
   * @name ViewModel#afterListSuccess
   * @type {function}
   * @description Amend the view with the list of items
   * @param {Object} response
   * @return {ViewState} The new state of the view model
   */
  afterListSuccess: stateContainer.createAction((current, response = {}) => ({
    ...current,
    items: response.items || [],
    isLoading: false,
  })),

  /**
   * @name ViewModel#afterListError
   * @type {function}
   * @description Amend the view with the error encountered when loading the list
   * @param {ModelError} error The error returned from the model
   * @return {ViewState} The new state of the widget
   */
  afterListError: stateContainer.createAction((current, error) => ({
    ...current,
    error: uiError(error),
    isLoading: false,
  })),
});
