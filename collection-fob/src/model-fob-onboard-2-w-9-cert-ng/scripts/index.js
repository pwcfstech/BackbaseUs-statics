/**
 * @module model-fob-onboard-2-w-9-cert-ng
 *
 * @description
 * Model for widget-fob-onboard-2-w-9-cert-ng
 *
 * @example
 * import modelOnboard2W9CertModuleKey, { modelOnboard2W9CertKey } from 'model-fob-onboard-2-w-9-cert-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelOnboard2W9CertModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelOnboard2W9CertKey,
 *     // into
 *     function someFactory(onboard2W9CertModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './onboard-2-w-9-cert';

const moduleKey = 'model-fob-onboard-2-w-9-cert-ng';
export const modelOnboard2W9CertKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelOnboard2W9CertKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
