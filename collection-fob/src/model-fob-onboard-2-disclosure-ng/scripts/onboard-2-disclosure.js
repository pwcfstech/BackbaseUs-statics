/**
 * Model factory for model-fob-onboard-2-disclosure-ng
 *
 * @inner
 * @type {function}
 * @param {Object} Promise An ES2015 compatible `Promise` object.
 *
 * @return {Object}
 */
export default function onboard2DisclosureModel(Promise) {
  /**
   * @name onboard2DisclosureModel#load
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
   * @name onboard2DisclosureModel#save
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
   * @name onboard2DisclosureModel
   * @type {Object}
   */
  return {
    load,
    save,
  };
}
