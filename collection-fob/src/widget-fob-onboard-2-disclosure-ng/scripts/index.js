/**
 * @module widget-fob-onboard-2-disclosure-ng
 *
 * @description
 * Personal information collection disclosure
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelOnboard2DisclosureModuleKey, {
    modelOnboard2DisclosureKey,
} from 'model-fob-onboard-2-disclosure-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-onboard-2-disclosure-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelOnboard2DisclosureModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('Onboard2DisclosureController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelOnboard2DisclosureKey,
    /* into */
    Controller,
  ])

  .name;
