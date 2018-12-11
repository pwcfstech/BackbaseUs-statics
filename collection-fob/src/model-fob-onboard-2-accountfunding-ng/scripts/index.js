/**
 * @module model-fob-onboard-2-accountfunding-ng
 *
 * @description
 * Model for widget-fob-onboard-2-accountfunding-ng
 *
 * @example
 * import modelOnboard2AccountfundingModuleKey, { modelOnboard2AccountfundingKey } from 'model-fob-onboard-2-accountfunding-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelOnboard2AccountfundingModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelOnboard2AccountfundingKey,
 *     // into
 *     function someFactory(onboard2AccountfundingModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './onboard-2-accountfunding';
import accountCreationSpecificationDataModuleKey, { accountCreationSpecificationDataKey } from 'data-bb-account-creation-specification-http-ng';
const moduleKey = 'model-fob-onboard-2-accountfunding-ng';
export const modelOnboard2AccountfundingKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [accountCreationSpecificationDataModuleKey])

  .factory(modelOnboard2AccountfundingKey, [
    '$q',
    accountCreationSpecificationDataKey,
    /* into */
    Model,
  ])

  .name;
