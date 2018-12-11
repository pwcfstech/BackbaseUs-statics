/**
 * @module model-select-goal-ng
 *
 * @description
 * Model for widget-select-goal-ng
 *
 * @example
 * import modelGoalModuleKey, { modelGoalKey } from 'model-select-goal-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelGoalModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelGoalKey,
 *     // into
 *     function someFactory(goalModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './goal';
import cipDataModuleKey, {cipDataKey} from 'data-bb-cip-http-ng';
const moduleKey = 'model-select-goal-ng';
export const modelGoalKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [cipDataModuleKey])

  .factory(modelGoalKey, [
    '$q',
    cipDataKey,
    /* into */
    Model,
  ])

  .name;
