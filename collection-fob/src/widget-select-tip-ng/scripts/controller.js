/**
 * @module widget-select-tip-ng
 * @name TipController
 *
 * @description
 * Tip
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';

const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');

export default function TipController(bus, hooks, widget, model) {
    const $ctrl = this;
   
    /**
    * AngularJS Lifecycle hook used to initialize the controller
    *
    * @name TipController#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;
        $ctrl.btn = getTips();
        $ctrl.icons = getIconsForTips($ctrl.btn);
        /* FOB Experience */
        /*$ctrl.experienceName = 'future-of-banking';*/
        $ctrl.experienceName=getPortalName('retail-banking-demo');
    

        $ctrl.moveToNextScreen = function() {
            window.location.href = CreateURL('tools-and-services');
        };
        $ctrl.moveToPreviousScreen = function() {
            window.location.href = CreateURL('select-goals');
        };

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
        * @name TipController#items
        * @type {any}
        */
        items: null,

        /**
        * @description
        * Loading status
        *
        * @name TipController#isLoading
        * @type {boolean}
        */
        isLoading: false,

        /**
        * @description
        * The error encountered when attempting to fetch from the model
        *
        * @name TipController#error
        * @type {ModelError}
        */
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

    function getTips() {
        var tips = [];
        try {
            var prospectData = getSessionData();
            if (!prospectData || !Object.keys(prospectData).length) {
                tips = ["Stick to a budget", "Save a portion of my paycheck", "Contribute to my savings"];    
            }else{
                tips = prospectData.tips;
            }    

        } catch (err) {
            console.log('Error getting tips for the buttons. Hardcoding values...');
            console.log(err);
            tips = ["Stick to a budget", "Save a portion of my paycheck", "Contribute to my savings"];
            getIconsForTips(tips);
        }
        return tips;
    }

    function getIconsForTips(tipsArray){
        var tipIcons = [];
        for (var i =0 ; i < tipsArray.length; i++) {

            if(tipsArray[i] && tipsArray[i].toLowerCase().indexOf("allocation") != -1 ){

                tipIcons[i] = "allocation.png";
            }

            if(tipsArray[i] && tipsArray[i].toLowerCase().indexOf("budget") != -1 ){

                tipIcons[i] = "budget.png";
            }


            if(tipsArray[i] && tipsArray[i].toLowerCase().indexOf("credit") != -1 ){

                tipIcons[i] = "credit.png";
            }

            if(tipsArray[i] && tipsArray[i].toLowerCase().indexOf("debt") != -1 ){

                tipIcons[i] = "debt.png";
            }

            if(tipsArray[i] && tipsArray[i].toLowerCase().indexOf("documents") != -1 ){

                tipIcons[i] = "documents.png";
            }
            if(tipsArray[i] && tipsArray[i].toLowerCase().indexOf("fund") != -1 ){

                tipIcons[i] = "fund.png";
            }

            if(tipsArray[i] && tipsArray[i].toLowerCase().indexOf("identity") != -1 ){

                tipIcons[i] = "idtheft.png";
            }

            if(tipsArray[i] && tipsArray[i].toLowerCase().indexOf("insurance") != -1 ){

                tipIcons[i] = "insurance.png";
            }

            if(tipsArray[i] && tipsArray[i].toLowerCase().indexOf("plan") != -1 ){

                tipIcons[i] = "family.png";
            }
            if(tipsArray[i] && tipsArray[i].toLowerCase().indexOf("save") != -1 ){

                tipIcons[i] = "save.png";
            }

            if(tipsArray[i] && tipsArray[i].toLowerCase().indexOf("wellness") != -1 ){

                tipIcons[i] = "wellness.png";
            }

            if(tipsArray[i] && tipsArray[i].toLowerCase().indexOf("savings") != -1 ){

                tipIcons[i] = "retirement.png";
            }

            if(!tipIcons[i]){
                tipIcons[i] = "save.png";
            }
            
           
        }

        return tipIcons;
    }


    $ctrl.tapButton = function (buttonIndex) {
        //var indexNumber = buttonIndex['$index'];
        $ctrl.moveToNextScreen();
    }
    

    function CreateURL(nextPageName) {
        var url = '/gateway/' + $ctrl.experienceName + '/' + nextPageName;
        console.log('Created path: ' + url);
        return url;
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
        return CryptoJS.AES.encrypt(JSON.stringify(data),CryptoJS.AES.getFobKey() );
    }


    function decryptData(data) {
        return JSON.parse(CryptoJS.AES.decrypt(data,CryptoJS.AES.getFobKey()).toString(CryptoJS.enc.Utf8));
    }

} // end of export
