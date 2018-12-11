/* eslint-disable */
export default (conf) => (httpClient, serializeParams) => {
  // Base param constants
  const baseUri = conf.baseUri || 'http://35.174.78.251:8080/gateway/api/new-prospect-service';

  const version = 'v1';


  /**
   * The root defined types from the RAML.
   * @private
   */
  const definedTypes = {};

  

  

  /*
   * @name parse
   * @type {Function}
   * @private
   * @description Should be overwritten by transformResponse on a project level
   */
  function parse(res) {
    return {
      data: res.data,
      headers: res.headers,
      status: res.status,
      statusText: res.statusText,
    };
  }

  
  /**
   * @name NewprospectData#postNewprospectRecord
   * @type {Function}
   * @description Create a new prospect in CRM
   
   * @param {?Object} data Data to be sent as the request message data.
     
   
   * @param {?Object} headers Map of custom header attributes.
     
   
   * @returns {Promise.<Response>}
   *
   * @example
   * newprospectData
   *  .postNewprospectRecord(data, headers)
   *  .then(function(result){
   *    console.log('headers', result.headers)
   *    console.log('data', result.data);
   *  });
   */
  function postNewprospectRecord(data, headers) {
    const url = `${baseUri}${version}/newprospect`;

    return httpClient({
      method: 'POST',
      url,
      
      data: data || {},
      
      headers: headers || {},
    }).then(parse)
    .catch(err => { throw parse(err); });
  }
  

  

  
  /**
   * @description
   * Schema data. Keys of the object are names of the POST and PUT methods
   *
   * Note: The schema is not strictly a JSON schema. It is a whitelisted set of
   * keys for each object property. The keys that are exposed are meant for validation
   * purposes.
   *
   * The full list of *possible* keys for each property is:
   * type, minimum, maximum, minLength, maxLength, pattern, enum, format, default,
   * properties, items, minItems, maxItems, uniqueItems and required.
   *
   * See http://json-schema.org/latest/json-schema-validation.html for more details
   * on the meaning of these keys.
   *
   * The "required" array from JSON schema is tranformed into a "required" boolean
   * on each property. This is for ease of use.
   *
   * @name NewprospectData#schemas
   * @type {Object}
   */
  const schemas = {};

    
  /**
   * @description
   * An object describing the JSON schema for the postNewprospectRecord method
   *
   * @name NewprospectData#schemas.postNewprospectRecord
   * @type {Object}
   * @example
   * {
  "properties": {
    "firstName": {
      "type": "string",
      "required": true
    },
    "lastName": {
      "type": "string",
      "required": true
    },
    "email": {
      "type": "string",
      "required": true
    },
    "age": {
      "type": "integer",
      "required": true
    },
    "householdIncome": {
      "type": "string",
      "required": true
    },
    "investableAssets": {
      "type": "string",
      "required": true
    },
    "postalCode": {
      "type": "string",
      "required": true
    },
    "countryCode": {
      "type": "string",
      "required": true
    },
    "segmentKey": {
      "type": "string",
      "required": true
    },
    "goalKey": {
      "type": "string",
      "required": true
    },
    "stayInTouch": {
      "type": "boolean",
      "required": true
    },
    "packagesPresented": {
      "type": "boolean",
      "required": true
    }
  }
}
   */

  schemas.postNewprospectRecord = {"properties":{"firstName":{"type":"string","required":true},"lastName":{"type":"string","required":true},"email":{"type":"string","required":true},"age":{"type":"integer","required":true},"householdIncome":{"type":"string","required":true},"investableAssets":{"type":"string","required":true},"postalCode":{"type":"string","required":true},"countryCode":{"type":"string","required":true},"segmentKey":{"type":"string","required":true},"goalKey":{"type":"string","required":true},"stayInTouch":{"type":"boolean","required":true},"packagesPresented":{"type":"boolean","required":true}}};


  /**
   * @typedef Response
   * @type {Object}
   * @property {Object} data See method descriptions for possible return types
   * @property {Function} headers Getter headers function
   * @property {Number} status HTTP status code of the response.
   * @property {String} statusText HTTP status text of the response.
   */

  return ({

    postNewprospectRecord,


    schemas,
  });
};
