/**
 * @module widget-fob-onboard-2-captureid-ng
 * @name Onboard2CaptureidController
 *
 * @description
 * Onboard 2 captureid
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';


const errorMessage = (code) => ({
    [E_AUTH]: 'error.load.auth',
    [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');


export default function Onboard2CaptureidController(bus, hooks, widget, model, $scope, $timeout) {
    const $ctrl = this;
    $ctrl.myInterval = 1000;

    /**
    * AngularJS Lifecycle hook used to initialize the controller
    *
    * @name Onboard2CaptureidController#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;
        $scope.photoPromptScreen = true;
        $scope.frontOfLicensePromptScreen = false;
        $scope.frontOfLicenseReviewScreen = false;
        $scope.frontOfLicenseApprovalScreen = false;
        $scope.backOfLicensePromptScreen = false;
        $scope.backOfLicenseReviewScreen = false;
        $scope.backOfLicenseApprovalScreen = false;
        $timeout(console.log("testing"), 9000);

        /*$ctrl.experienceName = 'future-of-banking';*/
        $ctrl.experienceName=getPortalName('retail-banking-demo');

        model.load()
            .then(loaded => {
                $ctrl.items = hooks.itemsFromModel(loaded);
            })
            .catch(error => {
                $ctrl.error = errorMessage(error.code);
                bus.publish('widget-fob-onboard-2-captureid-ng.load.failed', { error });
            })
            .then(() => { });

        bus.publish('cxp.item.loaded', { id: widget.getId(), });

        bus.publish('bb.item.loaded', { id: widget.getId(), });

        $ctrl.isLoading = false;
    };


    Object.assign($ctrl, {
        $onInit,
        items: null,
        isLoading: false,
        error: null,
    });


    //---------------------------------------------------------------------------------
    //  FOB  FUNCTIONS
    //---------------------------------------------------------------------------------


    function CreateURL(nextPageName) {
        var url = '/gateway/' + $ctrl.experienceName + '/' + nextPageName;
        return url;
    }

    function getPortalName(defaultPortalName) {
        return window._portalConfiguration && window._portalConfiguration.portalName
          ? window._portalConfiguration.portalName
          : defaultPortalName;
      } 

    $ctrl.moveToPreviousScreen = function () {
        window.location.href = CreateURL('onboard-personal-info');
    }

    $ctrl.moveToNextScreen = function (screenname) {

        switch (screenname) {

            case "photoPromptScreen": $scope.photoPromptScreen = true;
                $scope.frontOfLicensePromptScreen = false;
                $scope.frontOfLicenseReviewScreen = false;
                $scope.frontOfLicenseApprovalScreen = false;
                $scope.backOfLicensePromptScreen = false;
                $scope.backOfLicenseReviewScreen = false;
                $scope.backOfLicenseApprovalScreen = false;
                break;

            case "frontOfLicensePromptScreen":
                $scope.photoPromptScreen = false;
                $scope.frontOfLicensePromptScreen = true;
                $scope.frontOfLicenseReviewScreen = false;
                $scope.frontOfLicenseApprovalScreen = false;
                $scope.backOfLicensePromptScreen = false;
                $scope.backOfLicenseReviewScreen = false;
                $scope.backOfLicenseApprovalScreen = false;
                break;
            case "frontOfLicenseReviewScreen":
                $scope.photoPromptScreen = false;
                $scope.frontOfLicensePromptScreen = false;
                $scope.frontOfLicenseReviewScreen = true;
                $scope.frontOfLicenseApprovalScreen = false;
                $scope.backOfLicensePromptScreen = false;
                $scope.backOfLicenseReviewScreen = false;
                $scope.backOfLicenseApprovalScreen = false;
                $timeout($ctrl.moveToNextScreen('frontOfLicenseApprovalScreen'), 3000);
                break;
            case "frontOfLicenseApprovalScreen":
                $scope.photoPromptScreen = false;
                $scope.frontOfLicensePromptScreen = false;
                $scope.frontOfLicenseReviewScreen = false;
                $scope.frontOfLicenseApprovalScreen = true;
                $scope.backOfLicensePromptScreen = false;
                $scope.backOfLicenseReviewScreen = false;
                $scope.backOfLicenseApprovalScreen = false;

                break;
            case "backOfLicensePromptScreen":
                $scope.photoPromptScreen = false;
                $scope.frontOfLicensePromptScreen = false;
                $scope.frontOfLicenseReviewScreen = false;
                $scope.frontOfLicenseApprovalScreen = false;
                $scope.backOfLicensePromptScreen = true;
                $scope.backOfLicenseReviewScreen = false;
                $scope.backOfLicenseApprovalScreen = false;
                break;
            case "backOfLicenseReviewScreen":
                $scope.photoPromptScreen = false;
                $scope.frontOfLicensePromptScreen = false;
                $scope.frontOfLicenseReviewScreen = false;
                $scope.frontOfLicenseApprovalScreen = false;
                $scope.backOfLicensePromptScreen = false;
                $scope.backOfLicenseReviewScreen = true;
                $scope.backOfLicenseApprovalScreen = false;
                $timeout($ctrl.moveToNextScreen('backOfLicenseApprovalScreen'), 3000);
                break;
            case "backOfLicenseApprovalScreen":
                $scope.photoPromptScreen = false;
                $scope.frontOfLicensePromptScreen = false;
                $scope.frontOfLicenseReviewScreen = false;
                $scope.frontOfLicenseApprovalScreen = false;
                $scope.backOfLicensePromptScreen = false;
                $scope.backOfLicenseReviewScreen = false;
                $scope.backOfLicenseApprovalScreen = true;
                break;
            case "current-address":
                $scope.photoPromptScreen = false;
                $scope.frontOfLicensePromptScreen = false;
                $scope.frontOfLicenseReviewScreen = false;
                $scope.frontOfLicenseApprovalScreen = false;
                $scope.backOfLicensePromptScreen = false;
                $scope.backOfLicenseReviewScreen = false;
                $scope.backOfLicenseApprovalScreen = false;
                window.location.href = CreateURL('current-address');
                break;
        }



        $timeout( function(){
            if(screenname==='frontOfLicenseReviewScreen'){
                $ctrl.moveToNextScreen('frontOfLicenseApprovalScreen');
            }

            if(screenname==='backOfLicenseReviewScreen'){
                $ctrl.moveToNextScreen('backOfLicenseApprovalScreen');
            }    

        }, 4000 );

    }
}
