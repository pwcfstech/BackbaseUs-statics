/**
 * @module widget-fob-onboard-2-verifyidwaitscreen-ng
 * @name Onboard2VerifyidwaitscreenController
 *
 * @description
 * Onboard 2 verifyidwaitscreen
 */


import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';

const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');

export default function Onboard2VerifyidwaitscreenController(bus, hooks, widget, model) {
  const $ctrl = this;
  

  $ctrl.CreateURL = function(experienceName, nextPageName) {
      var url = '/gateway/' + experienceName + '/' + nextPageName;
      console.log('Created path: ' + url);
      return url;
  }


  /**
   * AngularJS Lifecycle hook used to initialize the controller
   *
   * @name Onboard2VerifyidwaitscreenController#$onInit
   * @type {function}
   * @returns {void}
   */
  const $onInit = () => {
    $ctrl.isLoading = true;


    /*$ctrl.experienceName = 'future-of-banking';*/
    $ctrl.experienceName=getPortalName('retail-banking-demo');
    //$ctrl.experienceName = 'pwc-onboarding-2';

    $ctrl.nextPageURL = $ctrl.CreateURL($ctrl.experienceName, 'congrats-onboarding-complete');
    
    $ctrl.moveToPreviousScreen = function() {
        window.location.href = $ctrl.previousPageURL;
    }
    $ctrl.moveToNextScreen = function() {
        window.location.href = $ctrl.nextPageURL;
    }

    
    //$ctrl.testTimer();
    model.load()
      .then(loaded => {
        $ctrl.items = hooks.itemsFromModel(loaded);
      })
      .catch(error => {
        $ctrl.error = errorMessage(error.code);
        bus.publish('widget-fob-onboard-2-verifyidwaitscreen-ng.load.failed', { error });
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
     * @name Onboard2VerifyidwaitscreenController#items
     * @type {any}
     */
    items: null,

    /**
     * @description
     * Loading status
     *
     * @name Onboard2VerifyidwaitscreenController#isLoading
     * @type {boolean}
     */
    isLoading: false,

    /**
     * @description
     * The error encountered when attempting to fetch from the model
     *
     * @name Onboard2VerifyidwaitscreenController#error
     * @type {ModelError}
     */
    error: null,

  }
  );
  function getPortalName(defaultPortalName) {
    return window._portalConfiguration && window._portalConfiguration.portalName
      ? window._portalConfiguration.portalName
      : defaultPortalName;
  } 
}
