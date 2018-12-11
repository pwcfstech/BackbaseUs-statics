/**
 * Model factory for model-fob-onboard-2-captureid-ng
 *
 * @inner
 * @type {function}
 * @param {Object} Promise An ES2015 compatible `Promise` object.
 *
 * @return {Object}
 */
export default function onboard2CaptureidModel(Promise) {
  /**
   * @name onboard2CaptureidModel#load
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
   * @name onboard2CaptureidModel#save
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
   * @name onboard2CaptureidModel
   * @type {Object}
   */
  return {
    load,
    save,
  };
}
