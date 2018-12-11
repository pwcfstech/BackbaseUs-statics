/**
 * @module widget-fob-dashboard-ng
 *
 * @description
 * Dashboard
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelDashboardModuleKey, {
    modelDashboardKey,
} from 'model-fob-dashboard-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-dashboard-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelDashboardModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('DashboardController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelDashboardKey,
    /* into */
    Controller,
  ])

  .name;
