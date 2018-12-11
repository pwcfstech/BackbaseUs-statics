/**
 * Model factory for model-fob-toolsandservices-ng
 *
 * @inner
 * @type {function}
 * @param {Object} Promise An ES2015 compatible `Promise` object.
 *
 * @return {Object}
 */
export default function toolsandservicesModel(Promise, ToolsAndServicesData) {

// let getToolsandservices = () => {
//   console.log("I am from toolandservice.js");
//   return getToolsandservices
//     .getToolsandservices()
//     .then(response => response.data);
// };

// // return {
// //   getToolsandservices,
// }
function doPost(data, headers){
    return ToolsAndServicesData.postNewprospectRecord(data, headers)
        .then((response) => {
            console.log('Response from doPost()');
            console.log(response.data);
            return response.data;
        });
}

  /**
   * @name appointmentsModel#save
   * @type {function}
   *
   * @description
   * Save some data.
   *
   * @returns {Promise.<Object>} A Promise with some data.
   */
  // function save() {
  //   return Promise.resolve();
  // }

  /**
   * @name appointmentsModel
   * @type {Object}
   */
  return {
    doPost
  };
}
