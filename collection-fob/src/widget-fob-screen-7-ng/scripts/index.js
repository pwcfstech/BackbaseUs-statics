/**
 * @module widget-fob-screen-7-ng
 *
 * @description
 * Screen 7
 */
import angular from 'vendor-bb-angular';
import fobcarousel from 'vendor-fob-carousel-ng';
import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelScreen7ModuleKey, {
    modelScreen7Key,
} from 'model-fob-screen-7-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-screen-7-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelScreen7ModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('Screen7Controller', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelScreen7Key,
    /* into */
    Controller,
  ])

  .name;
