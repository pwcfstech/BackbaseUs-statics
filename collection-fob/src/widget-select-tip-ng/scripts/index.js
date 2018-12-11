/**
 * @module widget-select-tip-ng
 *
 * @description
 * Tip
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelTipModuleKey, {
    modelTipKey,
} from 'model-select-tip-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-select-tip-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelTipModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('TipController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelTipKey,
    /* into */
    Controller,
  ])

  .name;
