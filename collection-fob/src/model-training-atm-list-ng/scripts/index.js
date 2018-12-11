/**
 * @module model-training-atm-list-ng
 *
 * @description
 * Model for widget-training-atm-list-ng
 *
 * @example
 * import modelAtmListModuleKey, { modelAtmListKey } from 'model-training-atm-list-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelAtmListModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelAtmListKey,
 *     // into
 *     function someFactory(atmListModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './atm-list';

const moduleKey = 'model-training-atm-list-ng';
export const modelAtmListKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelAtmListKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
