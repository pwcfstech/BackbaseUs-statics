/**
 * @module widget-select-goal-ng
 *
 * @description
 * Goal
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelGoalModuleKey, {
    modelGoalKey,
} from 'model-select-goal-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-select-goal-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelGoalModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('GoalController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelGoalKey,
    /* into */
    Controller,
  ])

  .name;
