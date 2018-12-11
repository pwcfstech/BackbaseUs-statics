/**
 * @module model-fob-onboard-2-screen-4-ng
 *
 * @description
 * Model for widget-fob-onboard-2-screen-4-ng
 *
 * @example
 * import modelOnboard2Screen4ModuleKey, { modelOnboard2Screen4Key } from 'model-fob-onboard-2-screen-4-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelOnboard2Screen4ModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelOnboard2Screen4Key,
 *     // into
 *     function someFactory(onboard2Screen4Model) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './onboard-2-screen-4';

const moduleKey = 'model-fob-onboard-2-screen-4-ng';
export const modelOnboard2Screen4Key = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelOnboard2Screen4Key, [
    '$q',
    /* into */
    Model,
  ])

  .name;
