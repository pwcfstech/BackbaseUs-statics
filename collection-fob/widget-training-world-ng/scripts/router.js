/**
 * The router service of the World widget
 *
 * @constructor Router
 * @param {StateContainer} stateContainer
 */
export default (stateContainer) => {
  let subscribers = [];

  /**
   * @name setRoute
   *
   * @inner
   * @description Inner method to update state with a new route
   * @type {function}
   * @param {{name: string, params: object}} route New route object
   * @returns {ViewState}
   */
  const setRoute = stateContainer.createAction((state, { name, params }) => ({
    ...state,
    route: {
      name,
      params,
    },
  }));

  /**
   * @name notifySubscribers
   *
   * @inner
   * @description Inner method to notify subscribers
   * @type {function}
   * @param {string} name New route name
   * @param {object} params New route parameters object
   */
  const notifySubscribers = (name, params) => {
    subscribers.forEach(subscriber => {
      subscriber(name, params);
    });
  };

  return {
    /**
     * @name Router#goto
     *
     * @description Method to navigate to a specific route
     * @type {function}
     * @param {string} name New route name
     * @param {object} params New route parameters object
     */
    goto: (name, params = {}) => {
      setRoute({ name, params });
      notifySubscribers(name, params);
    },

    /**
     * @name Router#getParams
     *
     * @description Method to get current route params from the {@link ViewState}
     * @type {function}
     * @returns {object} current parameters object
     */
    getParams: stateContainer.createSelector(state => state.route.params),

    /**
     * @name Router#getRoute
     *
     * @description Method to get current route name from the state
     * @type {function}
     */
    getRoute: stateContainer.createSelector(state => state.route.name),

    /**
     * @name Router#subscribe
     *
     * @description Method to subscribe to a route change
     * @type {function}
     * @param {function} callback A callback to be subscribed
     * @returns {function} The method to unsubscribe
     */
    subscribe: (callback) => {
      subscribers = [...subscribers, callback];
      return () => {
        subscribers = subscribers.filter(sub => sub !== callback);
      };
    },
  };
};
