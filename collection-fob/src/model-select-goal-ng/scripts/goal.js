 /**
 * Model factory for model-select-goal-ng
 *
 * @inner
 * @type {function}
 * @param {Object} Promise An ES2015 compatible `Promise` object.
 *
 * @return {Object}
 */
export default function goalModel(Promise, UserInfoData) {
    /**
   * @name goalModel#save
   * @type {function}
   *
   * @description
   * Save some data.
   *
   * @returns {Promise.<Object>} A Promise with some data.
   */
  function doPost(data, headers){
    return UserInfoData.postCipRecord(data, headers)
        .then((response) => {
            console.log('Response from doPost()');
            console.log(response.data);
            return response.data;
        });
  }
  /**
   * @name goalModel#load
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
   // return UserInfoData.postCipRecord(data, headers);
//  }
  /**
   * @name goalModel
   * @type {Object}
   */
  return {
    doPost,
    load
  };
}
