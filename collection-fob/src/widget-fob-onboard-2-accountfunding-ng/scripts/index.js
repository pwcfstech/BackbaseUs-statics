/**
 * @module widget-fob-onboard-2-accountfunding-ng
 *
 * @description
 * Screen 10 mambu api
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelOnboard2AccountfundingModuleKey, {
    modelOnboard2AccountfundingKey,
} from 'model-fob-onboard-2-accountfunding-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-onboard-2-accountfunding-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelOnboard2AccountfundingModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('Onboard2AccountfundingController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelOnboard2AccountfundingKey,
    /* into */
    Controller,
  ])

  .name;
