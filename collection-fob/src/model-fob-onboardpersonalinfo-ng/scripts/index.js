/**
 * @module model-fob-onboardpersonalinfo-ng
 *
 * @description
 * Model for widget-fob-onboardpersonalinfo-ng
 *
 * @example
 * import modelOnboardpersonalinfoModuleKey, { modelOnboardpersonalinfoKey } from 'model-fob-onboardpersonalinfo-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelOnboardpersonalinfoModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelOnboardpersonalinfoKey,
 *     // into
 *     function someFactory(onboardpersonalinfoModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './onboardpersonalinfo';

const moduleKey = 'model-fob-onboardpersonalinfo-ng';
export const modelOnboardpersonalinfoKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelOnboardpersonalinfoKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
