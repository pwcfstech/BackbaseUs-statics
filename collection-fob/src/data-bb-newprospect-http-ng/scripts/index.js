/* eslint-disable */
/**
 * @module data-bb-newprospect-http-ng
 *
 * @description A data module for accessing the newprospect REST API.
 *
 * @returns {String} `data-bb-newprospect-http-ng`
 * @example
 * import newprospectDataModuleKey, {
 *   newprospectDataKey,
 * } from 'data-bb-newprospect-http-ng';
 */

import ng from 'vendor-bb-angular';

import newprospectData from './data-bb-newprospect-http';

const newprospectDataModuleKey = 'data-bb-newprospect-http-ng';
/**
 * @name newprospectDataKey
 * @type {string}
 * @description Angular dependency injection key for the NewprospectData service
 */
export const newprospectDataKey = 'data-bb-newprospect-http-ng:newprospectData';
/**
 * @name default
 * @type {string}
 * @description Angular dependency injection module key
 */
export default ng
  .module(newprospectDataModuleKey, [])
  
  /**
   * @constructor NewprospectData
   * @type {object}
   *
   * @description Public api for data-bb-newprospect-http-ng service
   *
   */
  .provider(newprospectDataKey, [() => {
    const config = {
      baseUri: '/',
    };

    /**
     * @name NewprospectDataProvider
     * @type {object}
     * @ngkey data-bb-newprospect-http-ng:newprospectDataProvider
     * @description
     * Data service that can be configured with custom base URI.
     *
     * @example
     * // Configuring in an angular app:
     * angular.module(...)
     *   .config(['data-bb-newprospect-http-ng:newprospectDataProvider',
     *     (dataProvider) => {
     *       dataProvider.setBaseUri('http://my-service.com/');
     *       });
     *
     * // Configuring With config-bb-providers-ng:
     * export default [
     *   ['data-bb-newprospect-http-ng:newprospectDataProvider', (dataProvider) => {
     *       dataProvider.setBaseUri('http://my-service.com/');
     *   }]
     * ];
     */
    return {
      /**
       * @name NewprospectDataProvider#setBaseUri
       * @type {function}
       * @param {string} baseUri Base URI which will be the prefix for all HTTP requests
       */
      setBaseUri: (baseUri) => {
        config.baseUri = baseUri;
      },

      /**
       * @name NewprospectDataProvider#$get
       * @type {function}
       * @return {object} An instance of the service
       */
      $get: [
        '$http',
        '$httpParamSerializer',
        /* into */
       newprospectData(config),
      ],
    };
  }])

  .name;
