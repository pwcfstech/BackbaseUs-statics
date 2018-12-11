/**
 * @module model-fob-onboard-2-verifyidwaitscreen-ng
 *
 * @description
 * Model for widget-fob-onboard-2-verifyidwaitscreen-ng
 *
 * @example
 * import modelOnboard2VerifyidwaitscreenModuleKey, { modelOnboard2VerifyidwaitscreenKey } from 'model-fob-onboard-2-verifyidwaitscreen-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelOnboard2VerifyidwaitscreenModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelOnboard2VerifyidwaitscreenKey,
 *     // into
 *     function someFactory(onboard2VerifyidwaitscreenModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './onboard-2-verifyidwaitscreen';

const moduleKey = 'model-fob-onboard-2-verifyidwaitscreen-ng';
export const modelOnboard2VerifyidwaitscreenKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelOnboard2VerifyidwaitscreenKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
