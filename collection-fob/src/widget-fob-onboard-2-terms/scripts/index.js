/**
 * @module widget-fob-onboard-2-terms
 *
 * @description
 * Onboard 2 terms
 */
import angular from 'vendor-bb-angular';
import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks from 'lib-bb-widget-extension-ng';
import uibModalKey from 'vendor-bb-uib-modal';

import modelOnboard2TermsModuleKey, {
    modelOnboard2TermsKey,
} from 'model-fob-onboard-2-terms';

import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-fob-onboard-2-terms';
const hooksKey = `${moduleKey}:hooks`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    modelOnboard2TermsModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .controller('Onboard2TermsController', [
    // dependencies to inject
    eventBusKey,
    hooksKey,
    widgetKey,
    modelOnboard2TermsKey,
    '$scope',
    '$timeout',
    '$uibModal',
    /* into */
    Controller,
  ])

  .name;
