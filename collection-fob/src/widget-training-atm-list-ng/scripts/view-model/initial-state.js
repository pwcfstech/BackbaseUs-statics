export default () => ({
  items: [],
  route: {
    name: 'list',
    params: {},
  },
  isLoading: false,
  error: null,
});

/**
 * @typedef {object} ViewState
 * @description
 * The current state of the [ViewModel]{@link module:lib-bb-view-model-ng}.
 * @property {Array.<any>} items
 * @property {object} route Indicates current router state
 * @property {boolean} isLoading Indicates wether widget is loading data at the moment
 * @property {object} error The last encountered error
 */
