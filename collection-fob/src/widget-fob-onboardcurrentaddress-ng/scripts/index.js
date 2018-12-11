/**
 * @module widget-fob-onboardcurrentaddress-ng
 *
 * @description
 * Address verification entry
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelOnboardcurrentaddressModuleKey, {
    modelOnboardcurrentaddressKey,
} from 'model-fob-onboardcurrentaddress-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-onboardcurrentaddress-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelOnboardcurrentaddressModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('OnboardcurrentaddressController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelOnboardcurrentaddressKey,
    /* into */
    Controller,
  ])

  .name;
