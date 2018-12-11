/**
 * Model factory for model-fob-onboard-2-accountfunding-ng
 *
 * @inner
 * @type {function}
 * @param {Object} Promise An ES2015 compatible `Promise` object.
 *
 * @return {Object}
 */
export default function onboard2AccountfundingModel(Promise, AccountData) {
  /**
   * @name onboard2AccountfundingModel#load
   * @type {function}
   *
   * @description
   * Load some data.
   *
   * @returns {Promise.<Object>} A Promise with some data.
   */
  function doPost(data, headers){
    return AccountData.postAccountcreationRecord(data, headers)
        .then((response) => {
            console.log('Response from doPost()');
            console.log(response.data);
            return response.data;
        });
}

  /**
   * @name onboard2AccountfundingModel#save
   * @type {function}
   *
   * @description
   * Save some data.
   *
   * @returns {Promise.<Object>} A Promise with some data.
   */
  /**
   * @name onboard2AccountfundingModel
   * @type {Object}
   */
  return {
    doPost
  };
}
