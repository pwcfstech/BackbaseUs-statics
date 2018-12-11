/* eslint-disable */
/**
 * @module data-bb-cip-http-ng
 *
 * @description A data module for accessing the cip REST API.
 *
 * @returns {String} `data-bb-cip-http-ng`
 * @example
 * import cipDataModuleKey, {
 *   cipDataKey,
 * } from 'data-bb-cip-http-ng';
 */

import ng from 'vendor-bb-angular';

import cipData from './data-bb-cip-http';

const cipDataModuleKey = 'data-bb-cip-http-ng';
/**
 * @name cipDataKey
 * @type {string}
 * @description Angular dependency injection key for the CipData service
 */
export const cipDataKey = 'data-bb-cip-http-ng:cipData';
/**
 * @name default
 * @type {string}
 * @description Angular dependency injection module key
 */
export default ng
  .module(cipDataModuleKey, [])
  
  /**
   * @constructor CipData
   * @type {object}
   *
   * @description Public api for data-bb-cip-http-ng service
   *
   */
  .provider(cipDataKey, [() => {
    const config = {
      baseUri: '/',
    };

    /**
     * @name CipDataProvider
     * @type {object}
     * @ngkey data-bb-cip-http-ng:cipDataProvider
     * @description
     * Data service that can be configured with custom base URI.
     *
     * @example
     * // Configuring in an angular app:
     * angular.module(...)
     *   .config(['data-bb-cip-http-ng:cipDataProvider',
     *     (dataProvider) => {
     *       dataProvider.setBaseUri('http://my-service.com/');
     *       });
     *
     * // Configuring With config-bb-providers-ng:
     * export default [
     *   ['data-bb-cip-http-ng:cipDataProvider', (dataProvider) => {
     *       dataProvider.setBaseUri('http://my-service.com/');
     *   }]
     * ];
     */
    return {
      /**
       * @name CipDataProvider#setBaseUri
       * @type {function}
       * @param {string} baseUri Base URI which will be the prefix for all HTTP requests
       */
      setBaseUri: (baseUri) => {
        config.baseUri = baseUri;
      },

      /**
       * @name CipDataProvider#$get
       * @type {function}
       * @return {object} An instance of the service
       */
      $get: [
        '$http',
        '$httpParamSerializer',
        /* into */
       cipData(config),
      ],
    };
  }])

  .name;
