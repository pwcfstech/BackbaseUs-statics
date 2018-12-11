/**
 * @module widget-fob-onboard-2-capturebackimgid-ng
 * @name Onboard2CapturebackimgidController
 *
 * @description
 * Capture personal information (id)
 */


import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';

const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');

export default function Onboard2CapturebackimgidController(bus, hooks, widget, model) {
  const $ctrl = this;

  $ctrl.CreateURL = function(experienceName, nextPageName) {
     var url = '/gateway/' + experienceName + '/' + nextPageName;
     console.log('Created path: ' + url);
     return url;
  }

  /**
   * AngularJS Lifecycle hook used to initialize the controller
   *
   * @name Onboard2CapturebackimgidController#$onInit
   * @type {function}
   * @returns {void}
   */
  const $onInit = () => {
    /*$ctrl.experienceName = 'future-of-banking';*/
    $ctrl.experienceName=getPortalName('retail-banking-demo');

    $ctrl.nextPageURL = $ctrl.CreateURL($ctrl.experienceName, 'verify-current-address');
    $ctrl.previousPageURL = $ctrl.CreateURL($ctrl.experienceName, 'capture-id-1');

 
    $ctrl.isLoading = true;
    $ctrl.myInterval = 1000;
    $ctrl.slides = [
      {
        productName: "back.jpg",
        productDesc:"",
        id: 1
      }
    ]

    model.load()
      .then(loaded => {
        $ctrl.items = hooks.itemsFromModel(loaded);
      })
      .catch(error => {
        $ctrl.error = errorMessage(error.code);
        bus.publish('widget-fob-onboard-2-capturebackimgid-ng.load.failed', { error });
      })
      .then(() => { $ctrl.isLoading = false; });

    bus.publish('cxp.item.loaded', {
      id: widget.getId(),
    });

    bus.publish('bb.item.loaded', {
      id: widget.getId(),
    });
  };

  $ctrl.moveToPreviousScreen = function() {
        window.location.href = $ctrl.previousPageURL;
    }
  $ctrl.moveToNextScreen = function() {
        window.location.href = $ctrl.nextPageURL;
    }

  Object.assign($ctrl, {
    $onInit,


    /**
     * @description
     * The value returned from {@link Hooks.processItems} hook.
     * null if the items aren't loaded.
     *
     * @name Onboard2CapturebackimgidController#items
     * @type {any}
     */
    items: null,

    /**
     * @description
     * Loading status
     *
     * @name Onboard2CapturebackimgidController#isLoading
     * @type {boolean}
     */
    isLoading: false,

    /**
     * @description
     * The error encountered when attempting to fetch from the model
     *
     * @name Onboard2CapturebackimgidController#error
     * @type {ModelError}
     */
    error: null,

  });
  function getPortalName(defaultPortalName) {
    return window._portalConfiguration && window._portalConfiguration.portalName
      ? window._portalConfiguration.portalName
      : defaultPortalName;
  } 
}
