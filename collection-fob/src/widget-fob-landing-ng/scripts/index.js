/**
 * @module widget-fob-landing-ng
 *
 * @description
 * Landing
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelLandingModuleKey, {
    modelLandingKey,
} from 'model-fob-landing-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-landing-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelLandingModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('LandingController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelLandingKey,
    /* into */
    Controller,
  ])

  .name;
