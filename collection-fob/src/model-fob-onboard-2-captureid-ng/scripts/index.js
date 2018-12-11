/**
 * @module model-fob-onboard-2-captureid-ng
 *
 * @description
 * Model for widget-fob-onboard-2-captureid-ng
 *
 * @example
 * import modelOnboard2CaptureidModuleKey, { modelOnboard2CaptureidKey } from 'model-fob-onboard-2-captureid-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelOnboard2CaptureidModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelOnboard2CaptureidKey,
 *     // into
 *     function someFactory(onboard2CaptureidModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './onboard-2-captureid';

const moduleKey = 'model-fob-onboard-2-captureid-ng';
export const modelOnboard2CaptureidKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelOnboard2CaptureidKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
