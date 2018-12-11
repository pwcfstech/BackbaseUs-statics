/**
 * @module model-fob-onboard-2-disclosure-ng
 *
 * @description
 * Model for widget-fob-onboard-2-disclosure-ng
 *
 * @example
 * import modelOnboard2DisclosureModuleKey, { modelOnboard2DisclosureKey } from 'model-fob-onboard-2-disclosure-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelOnboard2DisclosureModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelOnboard2DisclosureKey,
 *     // into
 *     function someFactory(onboard2DisclosureModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './onboard-2-disclosure';

const moduleKey = 'model-fob-onboard-2-disclosure-ng';
export const modelOnboard2DisclosureKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelOnboard2DisclosureKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
