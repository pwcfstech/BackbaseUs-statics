/**
 * Model factory for model-fob-registerandlogin-ng
 *
 * @inner
 * @type {function}
 * @param {Object} Promise An ES2015 compatible `Promise` object.
 *
 * @return {Object}
 */
export default function registerandloginModel(Promise, ToolsAndServicesData) {

    function doPost(data, headers){
        console.log('New-Prospect making a request: ');
        console.log(data);

        return ToolsAndServicesData.postNewprospectRecord(data, headers)
            .then((response) => {
                console.log('Response from doPost()');
                console.log(response.data);
                return response.data;
            });
    }

  /**
   * @name registerandloginModel#load
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
   * @name registerandloginModel#save
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
   * @name registerandloginModel
   * @type {Object}
   */
  return {
    doPost,
    load,
    save,
  };
}
