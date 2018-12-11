/**
 * @module model-select-tip-ng
 *
 * @description
 * Model for widget-select-tip-ng
 *
 * @example
 * import modelTipModuleKey, { modelTipKey } from 'model-select-tip-ng';
 *
 * angular
 *   .module('ExampleModule', [modelTipModuleKey,])
 *   .factory('someFactory', [modelTipKey, function someFactory(tipModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './tip';
const moduleKey = 'model-select-tip-ng';
export const modelTipKey = `${moduleKey}:model`;

export default angular
 .module(moduleKey, [])

 .factory(modelTipKey, [
   '$q',
   /* into */
   Model,
 ])

 .name;