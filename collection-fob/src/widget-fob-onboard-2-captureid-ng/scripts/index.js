/**
 * @module widget-fob-onboard-2-captureid-ng
 *
 * @description
 * Onboard 2 captureid
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelOnboard2CaptureidModuleKey, {
    modelOnboard2CaptureidKey,
} from 'model-fob-onboard-2-captureid-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-onboard-2-captureid-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelOnboard2CaptureidModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('Onboard2CaptureidController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelOnboard2CaptureidKey,
    '$scope','$timeout',
    /* into */
    Controller,
  ])

  .name;
