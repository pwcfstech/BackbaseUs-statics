/**
 * @module model-fob-onboard-2-capturebackimgid-ng
 *
 * @description
 * Model for widget-fob-onboard-2-capturebackimgid-ng
 *
 * @example
 * import modelOnboard2CapturebackimgidModuleKey, { modelOnboard2CapturebackimgidKey } from 'model-fob-onboard-2-capturebackimgid-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelOnboard2CapturebackimgidModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelOnboard2CapturebackimgidKey,
 *     // into
 *     function someFactory(onboard2CapturebackimgidModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './onboard-2-capturebackimgid';

const moduleKey = 'model-fob-onboard-2-capturebackimgid-ng';
export const modelOnboard2CapturebackimgidKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelOnboard2CapturebackimgidKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
