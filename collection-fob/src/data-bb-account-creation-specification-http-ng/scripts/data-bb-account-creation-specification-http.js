/* eslint-disable */
export default (conf) => (httpClient, serializeParams) => {
  // Base param constants
  const baseUri = conf.baseUri || 'http://35.174.78.251:8080/gateway/api/account-creation-service';

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
   * @name AccountCreationSpecificationData#postAccountcreationRecord
   * @type {Function}
   * @description Create the bank account
   
   * @param {?Object} data Data to be sent as the request message data.
     
   
   * @param {?Object} headers Map of custom header attributes.
     
   
   * @returns {Promise.<Response>}
   *
   * @example
   * accountCreationSpecificationData
   *  .postAccountcreationRecord(data, headers)
   *  .then(function(result){
   *    console.log('headers', result.headers)
   *    console.log('data', result.data);
   *  });
   */
  function postAccountcreationRecord(data, headers) {
    const url = `${baseUri}${version}/accountcreation`;

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
   * @name AccountCreationSpecificationData#schemas
   * @type {Object}
   */
  const schemas = {};

    
  /**
   * @description
   * An object describing the JSON schema for the postAccountcreationRecord method
   *
   * @name AccountCreationSpecificationData#schemas.postAccountcreationRecord
   * @type {Object}
   * @example
   * {
  "properties": {
    "client": {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string",
          "required": true
        },
        "middleName": {
          "type": "string",
          "required": false
        },
        "lastName": {
          "type": "string",
          "required": true
        },
        "email": {
          "type": "string",
          "required": true
        },
        "homePhone": {
          "type": "string",
          "required": false
        },
        "mobilePhone": {
          "type": "string",
          "required": false
        },
        "birthdate": {
          "type": "string",
          "required": false
        },
        "gender": {
          "type": "string",
          "required": false
        },
        "addressLine1": {
          "type": "string",
          "required": false
        },
        "addressLine2": {
          "type": "string",
          "required": false
        },
        "city": {
          "type": "string",
          "required": false
        },
        "state": {
          "type": "string",
          "required": false
        },
        "postalCode": {
          "type": "string",
          "required": false
        },
        "countryCode": {
          "type": "string",
          "required": false
        }
      },
      "required": true
    },
    "account": {
      "type": "object",
      "properties": {
        "accountId": {
          "type": "string",
          "required": false
        },
        "accountName": {
          "type": "string",
          "required": false
        },
        "productTypeKey": {
          "type": "string",
          "required": true
        },
        "accountType": {
          "type": "string",
          "required": false
        },
        "accountState": {
          "type": "string",
          "required": false
        },
        "balance": {
          "type": "string",
          "required": false
        },
        "accruedInterest": {
          "type": "string",
          "required": false
        },
        "maturityDate": {
          "type": "string",
          "required": false
        },
        "targetAmount": {
          "type": "string",
          "required": false
        },
        "recommendedDepositAmount": {
          "type": "string",
          "required": false
        },
        "maxWidthdrawlAmount": {
          "type": "string",
          "required": false
        },
        "lockedBalance": {
          "type": "string",
          "required": false
        },
        "overdrafAmount": {
          "type": "string",
          "required": false
        },
        "overdraftInterestAccrued": {
          "type": "string",
          "required": false
        },
        "overdraftExpiryDate": {
          "type": "string",
          "required": false
        },
        "allowOverdraft": {
          "type": "boolean",
          "required": false
        },
        "overdraftLimit": {
          "type": "string",
          "required": false
        },
        "assignedBranchKey": {
          "type": "string",
          "required": false
        },
        "assignedCentreKey": {
          "type": "string",
          "required": false
        },
        "interestPaymentPoint": {
          "type": "string",
          "required": false
        },
        "interestPaymentDates": {
          "type": "string",
          "required": false
        },
        "withholdingTaxSourceKey": {
          "type": "string",
          "required": false
        },
        "notes": {
          "type": "string",
          "required": false
        },
        "currencyCode": {
          "type": "string",
          "required": false
        },
        "interestSettings": {
          "type": "object",
          "properties": {
            "interestRate": {
              "type": "string",
              "required": false
            },
            "interestChargeFrequency": {
              "type": "string",
              "required": false
            },
            "interestChargeFrequencyCount": {
              "type": "string",
              "required": false
            }
          },
          "required": false
        },
        "overdraftInterestSettings": {
          "type": "object",
          "properties": {
            "interestRate": {
              "type": "string",
              "required": false
            },
            "interestRateSource": {
              "type": "string",
              "required": false
            },
            "interestChargeFrequency": {
              "type": "string",
              "required": false
            },
            "interestChargeFrequencyCount": {
              "type": "string",
              "required": false
            },
            "interestSpread": {
              "type": "string",
              "required": false
            },
            "interestRateReviewCount": {
              "type": "string",
              "required": false
            },
            "interestRateReviewUnit": {
              "type": "string",
              "required": false
            }
          },
          "required": false
        }
      },
      "required": true
    },
    "transaction": {
      "type": "object",
      "properties": {
        "transactionType": {
          "type": "string",
          "required": true
        },
        "amount": {
          "type": "number",
          "required": true
        }
      },
      "required": true
    },
    "leadKey": {
      "type": "string",
      "maxLength": 80,
      "required": true
    }
  }
}
   */
      
  schemas.postAccountcreationRecord = {"properties":{"client":{"type":"object","properties":{"firstName":{"type":"string","required":true},"middleName":{"type":"string","required":false},"lastName":{"type":"string","required":true},"email":{"type":"string","required":true},"homePhone":{"type":"string","required":false},"mobilePhone":{"type":"string","required":false},"birthdate":{"type":"string","required":false},"gender":{"type":"string","required":false},"addressLine1":{"type":"string","required":false},"addressLine2":{"type":"string","required":false},"city":{"type":"string","required":false},"state":{"type":"string","required":false},"postalCode":{"type":"string","required":false},"countryCode":{"type":"string","required":false}},"required":true},"account":{"type":"object","properties":{"accountId":{"type":"string","required":false},"accountName":{"type":"string","required":false},"productTypeKey":{"type":"string","required":true},"accountType":{"type":"string","required":false},"accountState":{"type":"string","required":false},"balance":{"type":"string","required":false},"accruedInterest":{"type":"string","required":false},"maturityDate":{"type":"string","required":false},"targetAmount":{"type":"string","required":false},"recommendedDepositAmount":{"type":"string","required":false},"maxWidthdrawlAmount":{"type":"string","required":false},"lockedBalance":{"type":"string","required":false},"overdrafAmount":{"type":"string","required":false},"overdraftInterestAccrued":{"type":"string","required":false},"overdraftExpiryDate":{"type":"string","required":false},"allowOverdraft":{"type":"boolean","required":false},"overdraftLimit":{"type":"string","required":false},"assignedBranchKey":{"type":"string","required":false},"assignedCentreKey":{"type":"string","required":false},"interestPaymentPoint":{"type":"string","required":false},"interestPaymentDates":{"type":"string","required":false},"withholdingTaxSourceKey":{"type":"string","required":false},"notes":{"type":"string","required":false},"currencyCode":{"type":"string","required":false},"interestSettings":{"type":"object","properties":{"interestRate":{"type":"string","required":false},"interestChargeFrequency":{"type":"string","required":false},"interestChargeFrequencyCount":{"type":"string","required":false}},"required":false},"overdraftInterestSettings":{"type":"object","properties":{"interestRate":{"type":"string","required":false},"interestRateSource":{"type":"string","required":false},"interestChargeFrequency":{"type":"string","required":false},"interestChargeFrequencyCount":{"type":"string","required":false},"interestSpread":{"type":"string","required":false},"interestRateReviewCount":{"type":"string","required":false},"interestRateReviewUnit":{"type":"string","required":false}},"required":false}},"required":true},"transaction":{"type":"object","properties":{"transactionType":{"type":"string","required":true},"amount":{"type":"number","required":true}},"required":true},"leadKey":{"type":"string","maxLength":80,"required":true}}};
      

  /**
   * @typedef Response
   * @type {Object}
   * @property {Object} data See method descriptions for possible return types
   * @property {Function} headers Getter headers function
   * @property {Number} status HTTP status code of the response.
   * @property {String} statusText HTTP status text of the response.
   */

  return ({
    
    postAccountcreationRecord,
    
    
    schemas,
  });
};
