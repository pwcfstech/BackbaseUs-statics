/**
 * @module model-fob-dashboard-ng
 *
 * @description
 * Model for widget-fob-dashboard-ng
 *
 * @example
 * import modelDashboardModuleKey, { modelDashboardKey } from 'model-fob-dashboard-ng';
 *
 * angular
 *   .module('ExampleModule', [
 *     modelDashboardModuleKey,
 *   ])
 *   .factory('someFactory', [
 *     modelDashboardKey,
 *     // into
 *     function someFactory(dashboardModel) {
 *       // ...
 *     },
 *   ]);
 */
import angular from 'vendor-bb-angular';

import Model from './dashboard';

const moduleKey = 'model-fob-dashboard-ng';
export const modelDashboardKey = `${moduleKey}:model`;

export default angular
  .module(moduleKey, [
  ])

  .factory(modelDashboardKey, [
    '$q',
    /* into */
    Model,
  ])

  .name;
