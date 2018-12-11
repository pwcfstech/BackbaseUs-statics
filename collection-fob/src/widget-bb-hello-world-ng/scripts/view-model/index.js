import list from './list';
import createInitialState from './initial-state';

export default (stateContainer) => ({
  /**
   * @name ViewModel#init
   * @type {function}
   * @description Initialize the container with the initial state if
   * it isn't already initialized (i.e. the current state is `undefined`)
   * @param {ViewState} current The current state of the widget
   * @return {ViewState} The new state of the widget
   */
  init: stateContainer.createAction((current = createInitialState()) => current),
  list: list(stateContainer),
});
