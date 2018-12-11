/**
 * Model factory for model-fob-screen-7-ng
 *
 * @inner
 * @type {function}
 * @param {Object} Promise An ES2015 compatible `Promise` object.
 *
 * @return {Object}
 */
export default function screen7Model(Promise, S7) {
  /**
   * @name screen7Model#load
   * @type {function}
   *
   * @description
   * Load some data.
   *
   * @returns {Promise.<Object>} A Promise with some data.
   */
function doPost(data, headers){
    return S7.postProductsrecommendRecord(data, headers)
        .then((response) => {
            return response.data;
        });
}

  function load() {
    return Promise.resolve();
  }
  /**
   * @name screen7Model#save
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
   * @name screen7Model
   * @type {Object}
   */
  return {
    doPost,
    load,
    save,
  };
}
