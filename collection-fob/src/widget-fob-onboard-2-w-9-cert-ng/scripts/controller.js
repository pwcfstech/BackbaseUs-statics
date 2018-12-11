/**
 * @module widget-fob-onboard-2-w-9-cert-ng
 * @name Onboard2W9CertController
 *
 * @description
 * Onboard 2 w 9 cert
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';


const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');


export default function Onboard2W9CertController(bus, hooks, widget, model) {
    const $ctrl = this;


    /**
    * AngularJS Lifecycle hook used to initialize the controller
    *
    * @name Onboard2W9CertController#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;

        /*$ctrl.experienceName = 'future-of-banking';*/
        $ctrl.experienceName=getPortalName('retail-banking-demo');

        $ctrl.moveToNextScreen = function() {
            window.location.href = CreateURL('review-info');
        };
        $ctrl.moveToPreviousScreen = function() {
            window.location.href = CreateURL('enter-required-info');
        };

        $ctrl.agreeAlert = function() {
            alert('Must agree to continue');
        }


        model.load().then(loaded => {
            $ctrl.items = hooks.itemsFromModel(loaded);
        }).catch(error => {
            $ctrl.error = errorMessage(error.code);
            bus.publish('widget-fob-onboard-2-w-9-cert-ng.load.failed', { error });
        }).then(() => {
            $ctrl.isLoading = false;
            });

        bus.publish('cxp.item.loaded', {
            id: widget.getId(),
        });

        bus.publish('bb.item.loaded', {
            id: widget.getId(),
        });
    }; // end of OnInit()


    Object.assign($ctrl, {
        $onInit,
        items: null,
        isLoading: false,
        error: null,
    });


//---------------------------------------------------------------------------------
//  FOB  FUNCTIONS
//---------------------------------------------------------------------------------

    function getPortalName(defaultPortalName) {
        return window._portalConfiguration && window._portalConfiguration.portalName
        ? window._portalConfiguration.portalName
        : defaultPortalName;
    } 

    function CreateURL(nextPageName) {
        var url = '/gateway/' + $ctrl.experienceName + '/' + nextPageName;
        return url;
    }



}
