/**
 * @module model-fob-onboardcurrentaddress-ng
 *
 * @description
 * Model for widget-fob-onboardcurrentaddress-ng
 *
 * @example
 * import modelOnboardcurrentaddressModuleKey, { modelOnboardcurrentaddressKey } from 'model-fob-onboardcurrentaddress-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelOnboardcurrentaddressModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelOnboardcurrentaddressKey,
 *     // into
 *     function someFactory(onboardcurrentaddressModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './onboardcurrentaddress';

const moduleKey = 'model-fob-onboardcurrentaddress-ng';
export const modelOnboardcurrentaddressKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelOnboardcurrentaddressKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
