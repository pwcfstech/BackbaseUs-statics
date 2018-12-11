/**
 * @module widget-fob-toolsandservices-ng
 *
 * @description
 * Toolsandservices
 */
import angular from 'vendor-bb-angular';
import fobcarousel from 'vendor-fob-carousel-ng';
import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelToolsandservicesModuleKey, {
    modelToolsandservicesKey,
} from 'model-fob-toolsandservices-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-toolsandservices-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelToolsandservicesModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('ToolsandservicesController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelToolsandservicesKey,
    /* into */
    Controller,
  ])

  .name;
