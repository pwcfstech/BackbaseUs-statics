/**
 * @module model-fob-userinfo-ng
 *
 * @description
 * Model for widget-fob-userinfo-ng
 *
 * @example
 * import modelUserinfoModuleKey, { modelUserinfoKey } from 'model-fob-userinfo-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelUserinfoModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelUserinfoKey,
 *     // into
 *     function someFactory(userinfoModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './userinfo';
import postalValidationSpecificationDataModuleKey, { postalValidationSpecificationDataKey } from 'data-bb-postal-validation-specification-http-ng';
const moduleKey = 'model-fob-userinfo-ng';
export const modelUserinfoKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [postalValidationSpecificationDataModuleKey])

  .factory(modelUserinfoKey, [
    '$q',
    postalValidationSpecificationDataKey,
    /* into */
    Model,
  ])

  .name;
