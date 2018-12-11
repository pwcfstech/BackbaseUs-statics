/**
 * @module widget-fob-onboard-2-terms
 * @name Onboard2TermsController
 *
 * @description
 * Onboard 2 terms
 */


import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';

const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');

export default function Onboard2TermsController(bus, hooks, widget, model, $scope, $timeout, $uibModal) {
  const $ctrl = this;
  $ctrl.CreateURL = function (experienceName, nextPageName) {
    var url = '/gateway/' + experienceName + '/' + nextPageName;
    console.log('Created path: ' + url);
    return url;
  }
  /**
   * AngularJS Lifecycle hook used to initialize the controller
   *
   * @name Onboard2TermsController#$onInit
   * @type {function}
   * @returns {void}
   */
  const $onInit = () => {
    $scope.isLoading = true;
    $scope.loadingDelay = 200;
    $scope.loading = true;
    $scope.counter = 0;
    $scope.max = 100;
    /*$ctrl.experienceName = 'future-of-banking';*/
    $ctrl.experienceName=getPortalName('retail-banking-demo');

    $ctrl.nextPageURL = $ctrl.CreateURL($ctrl.experienceName, 'congrats-onboarding-complete');
    $ctrl.previousPageURL = $ctrl.CreateURL($ctrl.experienceName, 'review-info');
    $ctrl.userInfo = getSessionData();
    $ctrl.email = $ctrl.userInfo.email;
    $ctrl.nextScreenButtonColor = getNextScreenButtonColor(false);

    if ($ctrl.userInfo && $ctrl.userInfo.email) {
      $ctrl.email = $ctrl.userInfo.email;
    } else {
      $ctrl.email = "xx@xx.com";
    }

    $scope.getProgress = function (scope) {
      return $scope.counter;
    }

    $ctrl.moveToPreviousScreen = function () {
      window.location.href = $ctrl.previousPageURL;
    }

    $ctrl.enableDisableNextButton = function () {
      if ($ctrl.term1 && $ctrl.term2 && $ctrl.term3) {
        $ctrl.nextScreenButtonColor = getNextScreenButtonColor(true);
      } else {
        $ctrl.nextScreenButtonColor = getNextScreenButtonColor(false);
      }
    }

    $scope.updateCounter = function () {
      if ($scope.counter < 100) {
        $scope.counter++;
        $scope.loading = true;
        $timeout( $scope.updateCounter, 40);
      } else {
        $scope.loading = false;
      }
    };

    $scope.modalOpen = false;
    $scope.open = function () {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'Onboard2TermsController',
      });

      modalInstance.opened.then(function () {
        $scope.modalOpen = true;
      });
    }

    $scope.updateCounter();

    $scope.$watch("modalOpen", function (newvalue, oldValue) {

      if ((newvalue != oldValue) && (newvalue)) {
        $timeout($ctrl.moveToNextScreen, 5000);
      }
    });

    $ctrl.moveToNextScreen = function () {
      if ($scope.counter === 100 && !$scope.loading) {
        window.location.href = $ctrl.nextPageURL;
      }
    }

    $ctrl.moveToVerifyScreen = function () {
      if ($ctrl.primaryScreen != false) {
        $ctrl.primaryScreen = false;
      } else {
        $ctrl.primaryScreen = true;
      }
    }

    model.load()
      .then(loaded => {
        $ctrl.items = hooks.itemsFromModel(loaded);
      })
      .catch(error => {
        $ctrl.error = errorMessage(error.code);
        bus.publish('widget-fob-onboard-2-terms.load.failed', { error });
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
     * @name Onboard2TermsController#items
     * @type {any}
     */
    items: null,

    /**
     * @description
     * Loading status
     *
     * @name Onboard2TermsController#isLoading
     * @type {boolean}
     */
    isLoading: false,

    /**
     * @description
     * The error encountered when attempting to fetch from the model
     *
     * @name Onboard2TermsController#error
     * @type {ModelError}
     */
    error: null,

  });

  function getPortalName(defaultPortalName) {
    return window._portalConfiguration && window._portalConfiguration.portalName
      ? window._portalConfiguration.portalName
      : defaultPortalName;
  } 

  function getSessionData() {
    try {
        var rawData = sessionStorage.getItem('userInfo');
        if(rawData == {}) {
            console.log('getSessionData() --> no USERINFO objects have been stored in browser');
            return {};
        }
        return decryptData(rawData);
    }
    catch (err) {
        console.log('Error: unable to getSessionData()');
        console.log(err);
        return {};
    }
}

function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.AES.getFobKey());
}


function decryptData(data) {
    return JSON.parse(CryptoJS.AES.decrypt(data, CryptoJS.AES.getFobKey()).toString(CryptoJS.enc.Utf8));
}


  function getNextScreenButtonColor(enabled) {
    if (enabled) {
      return {
        'pointer-events': 'auto',
        'color': 'white'/*,
        'background': '#0092AC'*/
      }
    } else {
      return {
        'pointer-events': 'none',
        'color': 'white',
        'background': 'rgb(166, 164, 164)'
      }
    }
  }


}
