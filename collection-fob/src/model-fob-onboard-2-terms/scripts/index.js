/**
 * @module model-fob-onboard-2-terms
 *
 * @description
 * Model for widget-fob-onboard-2-terms
 *
 * @example
 * import modelOnboard2TermsModuleKey, { modelOnboard2TermsKey } from 'model-fob-onboard-2-terms';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelOnboard2TermsModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelOnboard2TermsKey,
 *     // into
 *     function someFactory(onboard2TermsModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './onboard-2-terms';

const moduleKey = 'model-fob-onboard-2-terms';
export const modelOnboard2TermsKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelOnboard2TermsKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
