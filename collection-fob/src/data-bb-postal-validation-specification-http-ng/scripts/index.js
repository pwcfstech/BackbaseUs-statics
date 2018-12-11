/* eslint-disable */
/**
 * @module data-bb-postal-validation-specification-http-ng
 *
 * @description A data module for accessing the postal-validation-specification REST API.
 *
 * @returns {String} `data-bb-postal-validation-specification-http-ng`
 * @example
 * import postalValidationSpecificationDataModuleKey, {
 *   postalValidationSpecificationDataKey,
 * } from 'data-bb-postal-validation-specification-http-ng';
 */

import ng from 'vendor-bb-angular';

import postalValidationSpecificationData from './data-bb-postal-validation-specification-http';

const postalValidationSpecificationDataModuleKey = 'data-bb-postal-validation-specification-http-ng';
/**
 * @name postalValidationSpecificationDataKey
 * @type {string}
 * @description Angular dependency injection key for the PostalValidationSpecificationData service
 */
export const postalValidationSpecificationDataKey = 'data-bb-postal-validation-specification-http-ng:postalValidationSpecificationData';
/**
 * @name default
 * @type {string}
 * @description Angular dependency injection module key
 */
export default ng
  .module(postalValidationSpecificationDataModuleKey, [])
  
  /**
   * @constructor PostalValidationSpecificationData
   * @type {object}
   *
   * @description Public api for data-bb-postal-validation-specification-http-ng service
   *
   */
  .provider(postalValidationSpecificationDataKey, [() => {
    const config = {
      baseUri: '/',
    };

    /**
     * @name PostalValidationSpecificationDataProvider
     * @type {object}
     * @ngkey data-bb-postal-validation-specification-http-ng:postalValidationSpecificationDataProvider
     * @description
     * Data service that can be configured with custom base URI.
     *
     * @example
     * // Configuring in an angular app:
     * angular.module(...)
     *   .config(['data-bb-postal-validation-specification-http-ng:postalValidationSpecificationDataProvider',
     *     (dataProvider) => {
     *       dataProvider.setBaseUri('http://my-service.com/');
     *       });
     *
     * // Configuring With config-bb-providers-ng:
     * export default [
     *   ['data-bb-postal-validation-specification-http-ng:postalValidationSpecificationDataProvider', (dataProvider) => {
     *       dataProvider.setBaseUri('http://my-service.com/');
     *   }]
     * ];
     */
    return {
      /**
       * @name PostalValidationSpecificationDataProvider#setBaseUri
       * @type {function}
       * @param {string} baseUri Base URI which will be the prefix for all HTTP requests
       */
      setBaseUri: (baseUri) => {
        config.baseUri = baseUri;
      },

      /**
       * @name PostalValidationSpecificationDataProvider#$get
       * @type {function}
       * @return {object} An instance of the service
       */
      $get: [
        '$http',
        '$httpParamSerializer',
        /* into */
       postalValidationSpecificationData(config),
      ],
    };
  }])

  .name;
