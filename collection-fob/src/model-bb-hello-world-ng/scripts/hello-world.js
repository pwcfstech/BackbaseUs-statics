/**
 * Model factory for model-bb-hello-world-ng
 *
 * @inner
 * @type {function}
 * @param {Object} Promise An ES2015 compatible `Promise` object.
 *
 * @return {Object}
 */
export default function helloWorldModel(Promise) {
  /**
   * @name helloWorldModel#load
   * @type {function}
   *
   * @description
   * Load some data.
   *
   * @returns {Promise.<Object>} A Promise with some data.
   */
  function load() {
    return Promise.resolve();
  }

  /**
   * @name helloWorldModel#save
   * @type {function}
   *
   * @description
   * Save some data.
   *
   * @returns {Promise.<Object>} A Promise with some data.
   */
  function save() {
    return Promise.resolve();
  }

  /**
   * @name helloWorldModel
   * @type {Object}
   */
  return {
    load,
    save,
  };
}
