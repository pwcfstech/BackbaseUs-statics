/**
 * @module model-fob-toolsandservices-ng
 *
 * @description
 * Model for widget-fob-toolsandservices-ng
 *
 * @example
 * import modelToolsandservicesModuleKey, { modelToolsandservicesKey } from 'model-fob-toolsandservices-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelToolsandservicesModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelToolsandservicesKey,
 *     // into
 *     function someFactory(toolsandservicesModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';
import Model from './toolsandservices';
import newprospectDataModuleKey, { newprospectDataKey } from 'data-bb-newprospect-http-ng';

const moduleKey = 'model-fob-toolsandservices-ng';

export const modelToolsandservicesKey = `${moduleKey}:model`;
export default angular
  .module(moduleKey, [newprospectDataModuleKey])
  .factory(modelToolsandservicesKey, [
    '$q',
    newprospectDataKey,
    /* into */
    Model,
  ])
  .name;
