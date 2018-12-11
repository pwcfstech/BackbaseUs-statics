/**
 * @module widget-fob-onboardpersonalinfo-ng
 * @name OnboardpersonalinfoController
 *
 * @description
 * Collect personal information 
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';


const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');


export default function OnboardpersonalinfoController(bus, hooks, widget, model) {
    const $ctrl = this;
    

    /**
    * AngularJS Lifecycle hook used to initialize the controller
    *
    * @name OnboardpersonalinfoController#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;
        $ctrl.userInfo = getSessionData();
        
        if ($ctrl.userInfo && $ctrl.userInfo.firstName) {
            $ctrl.firstName = $ctrl.userInfo.firstName;
        } else {
            $ctrl.firstName = "Mary";
        }
        /*$ctrl.experienceName = 'future-of-banking';*/
        $ctrl.experienceName=getPortalName('retail-banking-demo');


        $ctrl.moveToNextScreen = function(screenName) {
            if(screenName ==='capture-id' ){
                window.location.href = CreateURL('capture-id');
            }

            if(screenName ==='current-address' ){
                
                window.location.href = CreateURL('current-address');
            }

        };
        $ctrl.moveToPreviousScreen = function() {
            window.location.href = CreateURL('select-package');
        };
        

        model.load().then(loaded => {
            $ctrl.items = hooks.itemsFromModel(loaded);
        })
        .catch(error => {
            $ctrl.error = errorMessage(error.code);
            bus.publish('widget-fob-onboardpersonalinfo-ng.load.failed', { error });
        })
        .then(() => {
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

    function CreateURL(nextPageName) {
        var url = '/gateway/' + $ctrl.experienceName + '/' + nextPageName;
        return url;
    }

    function getPortalName(defaultPortalName) {
        return window._portalConfiguration && window._portalConfiguration.portalName
          ? window._portalConfiguration.portalName
          : defaultPortalName;
      } 


    $ctrl.nonClickableButton = function() {
        alert('Sorry, this is not available for the demo');
    }
    
   
    function encryptData(data) {
        return CryptoJS.AES.encrypt(JSON.stringify(data),CryptoJS.AES.getFobKey());
    }


    function decryptData(data) {
        return JSON.parse(CryptoJS.AES.decrypt(data,CryptoJS.AES.getFobKey()).toString(CryptoJS.enc.Utf8));
    }

    function getSessionData() {
        try {
            var rawData = sessionStorage.getItem('userInfo');
            if(!rawData || !Object.keys(rawData).length) {
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


}
