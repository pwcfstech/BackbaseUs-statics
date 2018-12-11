/* eslint-disable */
/**
 * @module data-bb-samplepersist-http-ng
 *
 * @description A data module for accessing the samplepersist REST API.
 *
 * @returns {String} `data-bb-samplepersist-http-ng`
 * @example
 * import samplepersistDataModuleKey, {
 *   samplepersistDataKey,
 * } from 'data-bb-samplepersist-http-ng';
 */

import ng from 'vendor-bb-angular';

import samplepersistData from './data-bb-samplepersist-http';

const samplepersistDataModuleKey = 'data-bb-samplepersist-http-ng';
/**
 * @name samplepersistDataKey
 * @type {string}
 * @description Angular dependency injection key for the SamplepersistData service
 */
export const samplepersistDataKey = 'data-bb-samplepersist-http-ng:samplepersistData';
/**
 * @name default
 * @type {string}
 * @description Angular dependency injection module key
 */
export default ng
  .module(samplepersistDataModuleKey, [])
  
  /**
   * @constructor SamplepersistData
   * @type {object}
   *
   * @description Public api for data-bb-samplepersist-http-ng service
   *
   */
  .provider(samplepersistDataKey, [() => {
    const config = {
      baseUri: '/',
    };

    /**
     * @name SamplepersistDataProvider
     * @type {object}
     * @ngkey data-bb-samplepersist-http-ng:samplepersistDataProvider
     * @description
     * Data service that can be configured with custom base URI.
     *
     * @example
     * // Configuring in an angular app:
     * angular.module(...)
     *   .config(['data-bb-samplepersist-http-ng:samplepersistDataProvider',
     *     (dataProvider) => {
     *       dataProvider.setBaseUri('http://my-service.com/');
     *       });
     *
     * // Configuring With config-bb-providers-ng:
     * export default [
     *   ['data-bb-samplepersist-http-ng:samplepersistDataProvider', (dataProvider) => {
     *       dataProvider.setBaseUri('http://my-service.com/');
     *   }]
     * ];
     */
    return {
      /**
       * @name SamplepersistDataProvider#setBaseUri
       * @type {function}
       * @param {string} baseUri Base URI which will be the prefix for all HTTP requests
       */
      setBaseUri: (baseUri) => {
        config.baseUri = baseUri;
      },

      /**
       * @name SamplepersistDataProvider#$get
       * @type {function}
       * @return {object} An instance of the service
       */
      $get: [
        '$http',
        '$httpParamSerializer',
        /* into */
       samplepersistData(config),
      ],
    };
  }])

  .name;
