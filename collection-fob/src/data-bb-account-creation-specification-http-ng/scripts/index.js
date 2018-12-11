/* eslint-disable */
/**
 * @module data-bb-account-creation-specification-http-ng
 *
 * @description A data module for accessing the account-creation-specification REST API.
 *
 * @returns {String} `data-bb-account-creation-specification-http-ng`
 * @example
 * import accountCreationSpecificationDataModuleKey, {
 *   accountCreationSpecificationDataKey,
 * } from 'data-bb-account-creation-specification-http-ng';
 */

import ng from 'vendor-bb-angular';

import accountCreationSpecificationData from './data-bb-account-creation-specification-http';

const accountCreationSpecificationDataModuleKey = 'data-bb-account-creation-specification-http-ng';
/**
 * @name accountCreationSpecificationDataKey
 * @type {string}
 * @description Angular dependency injection key for the AccountCreationSpecificationData service
 */
export const accountCreationSpecificationDataKey = 'data-bb-account-creation-specification-http-ng:accountCreationSpecificationData';
/**
 * @name default
 * @type {string}
 * @description Angular dependency injection module key
 */
export default ng
  .module(accountCreationSpecificationDataModuleKey, [])
  
  /**
   * @constructor AccountCreationSpecificationData
   * @type {object}
   *
   * @description Public api for data-bb-account-creation-specification-http-ng service
   *
   */
  .provider(accountCreationSpecificationDataKey, [() => {
    const config = {
      baseUri: '/',
    };

    /**
     * @name AccountCreationSpecificationDataProvider
     * @type {object}
     * @ngkey data-bb-account-creation-specification-http-ng:accountCreationSpecificationDataProvider
     * @description
     * Data service that can be configured with custom base URI.
     *
     * @example
     * // Configuring in an angular app:
     * angular.module(...)
     *   .config(['data-bb-account-creation-specification-http-ng:accountCreationSpecificationDataProvider',
     *     (dataProvider) => {
     *       dataProvider.setBaseUri('http://my-service.com/');
     *       });
     *
     * // Configuring With config-bb-providers-ng:
     * export default [
     *   ['data-bb-account-creation-specification-http-ng:accountCreationSpecificationDataProvider', (dataProvider) => {
     *       dataProvider.setBaseUri('http://my-service.com/');
     *   }]
     * ];
     */
    return {
      /**
       * @name AccountCreationSpecificationDataProvider#setBaseUri
       * @type {function}
       * @param {string} baseUri Base URI which will be the prefix for all HTTP requests
       */
      setBaseUri: (baseUri) => {
        config.baseUri = baseUri;
      },

      /**
       * @name AccountCreationSpecificationDataProvider#$get
       * @type {function}
       * @return {object} An instance of the service
       */
      $get: [
        '$http',
        '$httpParamSerializer',
        /* into */
       accountCreationSpecificationData(config),
      ],
    };
  }])

  .name;
