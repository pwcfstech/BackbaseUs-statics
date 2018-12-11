/**
 * @module widget-fob-onboard-2-capturebackimgid-ng
 *
 * @description
 * Capture personal information (id)
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelOnboard2CapturebackimgidModuleKey, {
    modelOnboard2CapturebackimgidKey,
} from 'model-fob-onboard-2-capturebackimgid-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-onboard-2-capturebackimgid-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelOnboard2CapturebackimgidModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('Onboard2CapturebackimgidController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelOnboard2CapturebackimgidKey,
    /* into */
    Controller,
  ])

  .name;
