/**
 * @module widget-fob-onboard-2-congrats-ng
 * @name Onboard2CongratsController
 *
 * @description
 * Onboard 2 congrats
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';

const errorMessage = (code) => ({
    [E_AUTH]: 'error.load.auth',
    [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');

export default function Onboard2CongratsController(bus, hooks, widget, model) {
    const $ctrl = this;
    /**
    * AngularJS Lifecycle hook used to initialize the controller
    *
    * @name Onboard2CongratsController#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;
        /*$ctrl.experienceName = 'future-of-banking';*/
        $ctrl.experienceName=getPortalName('retail-banking-demo');

        $ctrl.bankOfAmerica = 'Bank of America';
        $ctrl.chase = 'Chase Bank';
        $ctrl.payPal = 'PayPal';
        $ctrl.city = 'City Bank';
        $ctrl.directDeposit = 'Direct Deposit';
        $ctrl.venmo = 'Venmo';
        $ctrl.userInfo = getSessionData();
        model.load()
            .then(loaded => {
                $ctrl.items = hooks.itemsFromModel(loaded);
            })
            .catch(error => {
                $ctrl.error = errorMessage(error.code);
                bus.publish('widget-fob-onboard-2-congrats-ng.load.failed', { error });
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


    $ctrl.moveToNextScreen = function (selectedInstitution) {
        saveBankSelection(selectedInstitution);
        window.location.href = CreateURL('account-funding');
    };


    function saveBankSelection(selectedInstitution) {
        try {
            var userInfo = getSessionData();
            userInfo.fundingInstitution = selectedInstitution || '';
            sessionStorage.setItem("userInfo", encryptData(userInfo));
        } catch (err) {
            console.log("Error :saveBankSelection() threw an exception. Creating new UserInfo domain object");
            console.log(err);
            $ctrl.userInfo.firstName = "Merry1";
            var userInfo = {};
            userInfo.fundingInstitution = selectedInstitution;
            sessionStorage.setItem("userInfo", encryptData(userInfo));
        }
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


    function encryptData(data) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.AES.getFobKey());
    }


    function decryptData(data) {
        return JSON.parse(CryptoJS.AES.decrypt(data, CryptoJS.AES.getFobKey()).toString(CryptoJS.enc.Utf8));
    }
}
