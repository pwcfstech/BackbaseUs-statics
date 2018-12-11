/* eslint-disable */
/**
 * @module data-bb-productsrecommend-http-ng
 *
 * @description A data module for accessing the productsrecommend REST API.
 *
 * @returns {String} `data-bb-productsrecommend-http-ng`
 * @example
 * import productsrecommendDataModuleKey, {
 *   productsrecommendDataKey,
 * } from 'data-bb-productsrecommend-http-ng';
 */

import ng from 'vendor-bb-angular';

import productsrecommendData from './data-bb-productsrecommend-http';

const productsrecommendDataModuleKey = 'data-bb-productsrecommend-http-ng';
/**
 * @name productsrecommendDataKey
 * @type {string}
 * @description Angular dependency injection key for the ProductsrecommendData service
 */
export const productsrecommendDataKey = 'data-bb-productsrecommend-http-ng:productsrecommendData';
/**
 * @name default
 * @type {string}
 * @description Angular dependency injection module key
 */
export default ng
  .module(productsrecommendDataModuleKey, [])
  
  /**
   * @constructor ProductsrecommendData
   * @type {object}
   *
   * @description Public api for data-bb-productsrecommend-http-ng service
   *
   */
  .provider(productsrecommendDataKey, [() => {
    const config = {
      baseUri: '/',
    };

    /**
     * @name ProductsrecommendDataProvider
     * @type {object}
     * @ngkey data-bb-productsrecommend-http-ng:productsrecommendDataProvider
     * @description
     * Data service that can be configured with custom base URI.
     *
     * @example
     * // Configuring in an angular app:
     * angular.module(...)
     *   .config(['data-bb-productsrecommend-http-ng:productsrecommendDataProvider',
     *     (dataProvider) => {
     *       dataProvider.setBaseUri('http://my-service.com/');
     *       });
     *
     * // Configuring With config-bb-providers-ng:
     * export default [
     *   ['data-bb-productsrecommend-http-ng:productsrecommendDataProvider', (dataProvider) => {
     *       dataProvider.setBaseUri('http://my-service.com/');
     *   }]
     * ];
     */
    return {
      /**
       * @name ProductsrecommendDataProvider#setBaseUri
       * @type {function}
       * @param {string} baseUri Base URI which will be the prefix for all HTTP requests
       */
      setBaseUri: (baseUri) => {
        config.baseUri = baseUri;
      },

      /**
       * @name ProductsrecommendDataProvider#$get
       * @type {function}
       * @return {object} An instance of the service
       */
      $get: [
        '$http',
        '$httpParamSerializer',
        /* into */
       productsrecommendData(config),
      ],
    };
  }])

  .name;
