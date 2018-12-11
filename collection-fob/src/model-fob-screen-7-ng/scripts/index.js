/**
 * @module model-fob-screen-7-ng
 *
 * @description
 * Model for widget-fob-screen-7-ng
 *
 * @example
 * import modelScreen7ModuleKey, { modelScreen7Key } from 'model-fob-screen-7-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelScreen7ModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelScreen7Key,
 *     // into
 *     function someFactory(screen7Model) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './screen-7';
//import productsrecommendDataModuleKey, {productsrecommendDataKey} from 'data-bb-productsrecommend-http-ng';
const moduleKey = 'model-fob-screen-7-ng';
export const modelScreen7Key = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [])
  .factory(modelScreen7Key, [
    '$q',
    /* into */
    Model,
  ])
  .name;
