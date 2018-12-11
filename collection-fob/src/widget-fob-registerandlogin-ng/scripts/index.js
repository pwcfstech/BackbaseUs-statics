/**
 * @module widget-fob-registerandlogin-ng
 *
 * @description
 * Registerandlogin
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';

import modelRegisterandloginModuleKey, {
    modelRegisterandloginKey,
} from 'model-fob-registerandlogin-ng';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-registerandlogin-ng';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelRegisterandloginModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('RegisterandloginController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelRegisterandloginKey,
    /* into */
    Controller,
  ])
  .name;
