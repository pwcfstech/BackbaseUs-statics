/**
 * @module widget-fob-onboardpersonalinfo-ng
 *
 * @description
 * Collect personal information 
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelOnboardpersonalinfoModuleKey, {
    modelOnboardpersonalinfoKey,
} from 'model-fob-onboardpersonalinfo-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-onboardpersonalinfo-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelOnboardpersonalinfoModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('OnboardpersonalinfoController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelOnboardpersonalinfoKey,
    /* into */
    Controller,
  ])

  .name;
