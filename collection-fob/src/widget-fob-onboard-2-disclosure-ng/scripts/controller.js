/**
 * @module widget-fob-onboard-2-disclosure-ng
 * @name Onboard2DisclosureController
 *
 * @description
 * Personal information collection disclosure
 */


import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';

const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');

export default function Onboard2DisclosureController(bus, hooks, widget, model) {
  const $ctrl = this;

  /**
   * AngularJS Lifecycle hook used to initialize the controller
   *
   * @name Onboard2DisclosureController#$onInit
   * @type {function}
   * @returns {void}
   */
  const $onInit = () => {
    $ctrl.isLoading = true;
    model.load()
      .then(loaded => {
        $ctrl.items = hooks.itemsFromModel(loaded);
      })
      .catch(error => {
        $ctrl.error = errorMessage(error.code);
        bus.publish('widget-fob-onboard-2-disclosure-ng.load.failed', { error });
      })
      .then(() => { $ctrl.isLoading = false; });

    bus.publish('cxp.item.loaded', {
      id: widget.getId(),
    });

    bus.publish('bb.item.loaded', {
      id: widget.getId(),
    });
  };

  Object.assign($ctrl, {
    $onInit,


    /**
     * @description
     * The value returned from {@link Hooks.processItems} hook.
     * null if the items aren't loaded.
     *
     * @name Onboard2DisclosureController#items
     * @type {any}
     */
    items: null,

    /**
     * @description
     * Loading status
     *
     * @name Onboard2DisclosureController#isLoading
     * @type {boolean}
     */
    isLoading: false,

    /**
     * @description
     * The error encountered when attempting to fetch from the model
     *
     * @name Onboard2DisclosureController#error
     * @type {ModelError}
     */
    error: null,

  });
}
