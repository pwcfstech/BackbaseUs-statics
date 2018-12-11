const templates = {
  list: '#ext-fob-onboard-2-accountfunding-ng/list.html',
};

/**
 * @name itemsFromModel
 *
 * @type {function}
 * @description Function to process model item in order
 * to have it suitable for the usage within the actual template
 *
 * @param {object} item from the state container to be transformed
 * @returns {object} item to be used in the extension
 */
const itemsFromModel = item => item;

export default ({ stateContainer, router }) => {
  /**
   * @name currentItems
   *
   * @type {function}
   * @description State selector for current items
   * @returns {Array} items transformed for the view
   */
  const currentItems = stateContainer.createSelector(
    state => state.items.map(itemsFromModel)
  );

  return {
    /**
     * @name template
     *
     * @type {function}
     * @description Returns a current template
     * @returns {stirng} template id
     */
    get template() {
      return templates[router.getRoute()];
    },

    /**
     * @name items
     *
     * @type {function}
     * @description Returns items to be used in the extension
     * @returns {array} item array
     */
    get items() {
      return currentItems();
    },

    /**
     * @name hasItems
     *
     * @type {function}
     * @description Returns items to be used in the extension
     * @returns {boolean} true if any data is loaded
     */
    get hasItems() {
      return currentItems().length;
    },
  };
};
