/**
 * @module model-training-world-ng
 *
 * @description
 * Model for widget-training-world-ng
 *
 * @example
 * import modelWorldModuleKey, { modelWorldKey } from 'model-training-world-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelWorldModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelWorldKey,
 *     // into
 *     function someFactory(worldModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './world';

const moduleKey = 'model-training-world-ng';
export const modelWorldKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelWorldKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
