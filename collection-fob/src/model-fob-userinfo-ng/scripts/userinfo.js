/**
 * Model factory for model-fob-userinfo-ng
 *
 * @inner
 * @type {function}
 * @param {Object} Promise An ES2015 compatible `Promise` object.
 *
 * @return {Object}
 */
export default function userinfoModel(Promise, PostalData) {
  /**
   * @name userinfoModel#load
   * @type {function}
   *
   * @description
   * Load some data.
   *
   * @returns {Promise.<Object>} A Promise with some data.
   */
  function doPost(data, headers){
    return PostalData.postPostalvalidationRecord(data, headers)
        .then((response) => {
            console.log('Response from doPost()');
            console.log(response.data);
            return response.data;
        });
  }

  function load() {
    return Promise.resolve();
  }
  /**
   * @name userinfoModel
   * @type {Object}
   */
  return {
    doPost,
    load
  };
}
