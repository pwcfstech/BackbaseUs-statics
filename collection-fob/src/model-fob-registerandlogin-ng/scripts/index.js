/**
 * @module model-fob-registerandlogin-ng
 *
 * @description
 * Model for widget-fob-registerandlogin-ng
 *
 * @example
 * import modelRegisterandloginModuleKey, { modelRegisterandloginKey } from 'model-fob-registerandlogin-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelRegisterandloginModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelRegisterandloginKey,
 *     // into
 *     function someFactory(registerandloginModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';
import Model from './registerandlogin';
import newprospectDataModuleKey, { newprospectDataKey } from 'data-bb-newprospect-http-ng';

const moduleKey = 'model-fob-registerandlogin-ng';

export const modelRegisterandloginKey = `${moduleKey}:model`;
export default angular
  .module(moduleKey, [newprospectDataModuleKey])
  .factory(modelRegisterandloginKey, [
    '$q',
    newprospectDataKey,
    /* into */
    Model,
  ])
  .name;
