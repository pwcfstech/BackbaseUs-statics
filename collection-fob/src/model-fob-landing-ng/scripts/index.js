/**
 * @module model-fob-landing-ng
 *
 * @description
 * Model for widget-fob-landing-ng
 *
 * @example
 * import modelLandingModuleKey, { modelLandingKey } from 'model-fob-landing-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelLandingModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelLandingKey,
 *     // into
 *     function someFactory(landingModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './landing';

const moduleKey = 'model-fob-landing-ng';
export const modelLandingKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelLandingKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
