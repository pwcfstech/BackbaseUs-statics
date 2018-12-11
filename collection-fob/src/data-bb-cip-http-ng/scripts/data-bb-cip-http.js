/* eslint-disable */
export default (conf) => (httpClient, serializeParams) => {
  // Base param constants
  const baseUri = conf.baseUri || 'http://35.174.78.251:8080/gateway/api/cip-service';

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
   * @name CipData#postCipRecord
   * @type {Function}
   * @description Request demographic segment
   
   * @param {?Object} data Data to be sent as the request message data.
     
   
   * @param {?Object} headers Map of custom header attributes.
     
   
   * @returns {Promise.<Response>}
   *
   * @example
   * cipData
   *  .postCipRecord(data, headers)
   *  .then(function(result){
   *    console.log('headers', result.headers)
   *    console.log('data', result.data);
   *  });
   */
  function postCipRecord(data, headers) {
    const url = `${baseUri}${version}/cip`;

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
   * @name CipData#schemas
   * @type {Object}
   */
  const schemas = {};

    
  /**
   * @description
   * An object describing the JSON schema for the postCipRecord method
   *
   * @name CipData#schemas.postCipRecord
   * @type {Object}
   * @example
   * {
  "properties": {
    "age": {
      "type": "integer",
      "minimum": 0,
      "required": true
    },
    "householdIncome": {
      "type": "string",
      "maxLength": 20,
      "required": true
    },
    "postalCode": {
      "type": "string",
      "maxLength": 20,
      "required": true
    },
    "countryCode": {
      "type": "string",
      "maxLength": 2,
      "required": true
    },
    "investableAssets": {
      "type": "string",
      "required": true
    }
  }
}
   */
      
  schemas.postCipRecord = {"properties":{"age":{"type":"integer","minimum":0,"required":true},"householdIncome":{"type":"string","maxLength":20,"required":true},"postalCode":{"type":"string","maxLength":20,"required":true},"countryCode":{"type":"string","maxLength":2,"required":true},"investableAssets":{"type":"string","required":true}}};
      

  /**
   * @typedef Response
   * @type {Object}
   * @property {Object} data See method descriptions for possible return types
   * @property {Function} headers Getter headers function
   * @property {Number} status HTTP status code of the response.
   * @property {String} statusText HTTP status text of the response.
   */

  return ({
    
    postCipRecord,
    
    
    schemas,
  });
};
