/**
 * @module model-bb-hello-world-ng
 *
 * @description
 * Model for widget-bb-hello-world-ng
 *
 * @example
 * import modelHelloWorldModuleKey, { modelHelloWorldKey } from 'model-bb-hello-world-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelHelloWorldModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelHelloWorldKey,
 *     // into
 *     function someFactory(helloWorldModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './hello-world';

const moduleKey = 'model-bb-hello-world-ng';
export const modelHelloWorldKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelHelloWorldKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
