/**
 * Model factory for model-training-world-ng
 *
 * @inner
 * @type {function}
 * @param {Object} Promise An ES2015 compatible `Promise` object.
 *
 * @return {Object}
 */
export default function worldModel(Promise) {
  /**
   * @name worldModel#load
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
   * @name worldModel#save
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
   * @name worldModel
   * @type {Object}
   */
  return {
    load,
    save,
  };
}
