/**
 * @module model-fob-onboard-2-reviewinformation-ng
 *
 * @description
 * Model for widget-fob-onboard-2-reviewinformation-ng
 *
 * @example
 * import modelOnboard2ReviewinformationModuleKey, { modelOnboard2ReviewinformationKey } from 'model-fob-onboard-2-reviewinformation-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelOnboard2ReviewinformationModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelOnboard2ReviewinformationKey,
 *     // into
 *     function someFactory(onboard2ReviewinformationModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './onboard-2-reviewinformation';

const moduleKey = 'model-fob-onboard-2-reviewinformation-ng';
export const modelOnboard2ReviewinformationKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelOnboard2ReviewinformationKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
