/**
 * @module widget-training-atm-list-ng
 *
 * @description
 * Atm list
 */
import angular from 'vendor-bb-angular';

import widgetModuleKey, { widgetKey } from 'lib-bb-widget-ng';
import eventBusModuleKey, { eventBusKey } from 'lib-bb-event-bus-ng';
import extendHooks, { extensionContextKey } from 'lib-bb-widget-extension-ng';
import stateContainerModuleKey, { bbStateContainerKey } from 'lib-bb-state-container-ng';
import bbIntentModuleKey, { bbIntentKey } from 'lib-bb-intent-ng';


import modelAtmListModuleKey, {
    modelAtmListKey,
} from 'model-training-atm-list-ng';

import Router from './router';
import AtmListService from './service';
import ViewModel from './view-model';
import Controller from './controller';

import defaultHooks from './default-hooks';

const moduleKey = 'widget-training-atm-list-ng';
const hooksKey = `${moduleKey}:hooks`;
const serviceKey = `${moduleKey}:service`;
const viewModelKey = `${moduleKey}:view-model`;
const routerKey = `${moduleKey}:router`;

export default angular
  .module(moduleKey, [
    widgetModuleKey,
    eventBusModuleKey,
    stateContainerModuleKey,
    bbIntentModuleKey,
    modelAtmListModuleKey,
  ])

  .factory(hooksKey, extendHooks(defaultHooks))

  .factory(serviceKey, [
    modelAtmListKey,
    viewModelKey,
    /* into */
    AtmListService,
  ])

  .factory(routerKey, [
    bbStateContainerKey,
    /* into */
    Router,
  ])

  .factory(viewModelKey, [
    bbStateContainerKey,
    /* into */
    ViewModel,
  ])

  .controller('AtmListController', [
    serviceKey,
    routerKey,
    /* into */
    Controller,
  ])

  // Add `service` to the `context` object
  // provided to the extension `helpers`, `events`, and `intents`
  .factory(extensionContextKey, [
    serviceKey,
    routerKey,
    /* into */
    (service, router) => ({
      service,
      router,
    }),
  ])

  .run([
    bbIntentKey, bbStateContainerKey, eventBusKey, widgetKey, viewModelKey,
    (bbIntent, bbStateContainer, eventBus, widget, viewModel) => {
      // Initialize the viewModel with an initial state
      viewModel.init();

      // Persist the current state of the widget when navigating to fulfill an intent
      bbIntent.persist(bbStateContainer.getState, bbStateContainer.setState);

      // Handle any incoming intents
      bbIntent.init().then(() => {
        // Mobile SDK < 3.0
        eventBus.publish('cxp.item.loaded', {
          id: widget.getId(),
        });

        // Mobile SDK >= 3.0
        eventBus.publish('bb.item.loaded', {
          id: widget.getId(),
        });
      });
    },
  ])

  .name;

/**
 * @typedef HelperContext
 * @type {object}
 * @extends module:lib-bb-extension-helpers-ng.HelperContext
 * @property {AtmListService} service
 */

/**
 * @typedef IntentContext
 * @type {object}
 * @extends module:lib-bb-extension-intents-ng.IntentContext
 * @property {AtmListService} service
 */

/**
 * @typedef EventContext
 * @type {object}
 * @extends module:lib-bb-extension-events-ng.EventContext
 * @property {AtmListService} service
 */
