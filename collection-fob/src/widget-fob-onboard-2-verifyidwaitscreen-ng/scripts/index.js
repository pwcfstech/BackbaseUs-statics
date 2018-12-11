/**
 * @module widget-fob-onboard-2-verifyidwaitscreen-ng
 *
 * @description
 * Onboard 2 verifyidwaitscreen
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelOnboard2VerifyidwaitscreenModuleKey, {
    modelOnboard2VerifyidwaitscreenKey,
} from 'model-fob-onboard-2-verifyidwaitscreen-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-onboard-2-verifyidwaitscreen-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelOnboard2VerifyidwaitscreenModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('Onboard2VerifyidwaitscreenController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelOnboard2VerifyidwaitscreenKey,
    /* into */
    Controller,
  ])

  .name;
