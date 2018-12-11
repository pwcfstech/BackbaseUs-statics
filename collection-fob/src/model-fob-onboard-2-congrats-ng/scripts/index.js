/**
 * @module model-fob-onboard-2-congrats-ng
 *
 * @description
 * Model for widget-fob-onboard-2-congrats-ng
 *
 * @example
 * import modelOnboard2CongratsModuleKey, { modelOnboard2CongratsKey } from 'model-fob-onboard-2-congrats-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelOnboard2CongratsModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelOnboard2CongratsKey,
 *     // into
 *     function someFactory(onboard2CongratsModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './onboard-2-congrats';

const moduleKey = 'model-fob-onboard-2-congrats-ng';
export const modelOnboard2CongratsKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelOnboard2CongratsKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
