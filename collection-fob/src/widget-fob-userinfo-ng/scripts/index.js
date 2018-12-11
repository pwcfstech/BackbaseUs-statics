/**
 * @module widget-fob-userinfo-ng
 *
 * @description
 * Userinfo
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelUserinfoModuleKey, {
    modelUserinfoKey,
} from 'model-fob-userinfo-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-userinfo-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelUserinfoModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('UserinfoController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelUserinfoKey,
    /* into */
    Controller,
  ])

  .name;
