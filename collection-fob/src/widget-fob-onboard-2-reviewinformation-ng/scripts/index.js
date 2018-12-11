/**
 * @module widget-fob-onboard-2-reviewinformation-ng
 *
 * @description
 * Onboard 2 reviewinformation
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelOnboard2ReviewinformationModuleKey, {
    modelOnboard2ReviewinformationKey,
} from 'model-fob-onboard-2-reviewinformation-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-onboard-2-reviewinformation-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelOnboard2ReviewinformationModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('Onboard2ReviewinformationController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelOnboard2ReviewinformationKey,
    '$scope',
    /* into */
    Controller,
  ])

  .name;
