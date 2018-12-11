/**
 * @module widget-fob-screen-7-ng
 * @name Screen7Controller
 *
 * @description
 * Screen 7
 */


import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';

const errorMessage = (code) => ({
    [E_AUTH]: 'error.load.auth',
    [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');

export default function Screen7Controller(bus, hooks, widget, model) {
    const $ctrl = this;
    $ctrl.packageList = true;
    $ctrl.myInterval = 1000;
    $ctrl.modalNotReadyOptions = false;
    $ctrl.modalProductInfo = false;
    $ctrl.primaryScreen = true;
    var productPopularity = getProductMarketValue();
    $ctrl.productDescTest = "% of people with similar goals have this package";

    $ctrl.slides = [ {
        productName: "Budget + Savings",
        productDesc: productPopularity[0] ,
        id: 1,
        tools: ["Goal Setting & Tracking", "Automatic Savings Transfer", "Spending Controller"],
        products: ["Spending Account", "Companion Savings"],
        features: [
            "No Minimum Balance",
            "Overdraft Protection",
            "Person to Person Payments",
            "No Fee at Non-Bank ATMs",
            "Reward Earning Account"
        ]
    },
    {
        productName: "Emergency Savings",
        productDesc:  productPopularity[1] ,
        id: 2,
        tools: ["Automatic Savings Transfer"],
        products: ["Savings Account"],
        features: [
            "No Minimum Balance",
            "Overdraft Protection",
            "Person to Person Payments",
            "No Fee at Non-Bank ATMs",
            "Reward Earning Account"
        ]
    },
    {
        productName: "Debt Reducing",
        productDesc: productPopularity[2] ,
        id: 3,
        tools: ["Spending Controller"],
        products: ["Spending Account"],
        features: [
            "No Minimum Balance",
            "Overdraft Protection",
            "Person to Person Payments",
            "No Fee at Non-Bank ATMs",
            "Reward Earning Account"
        ]
    }];

    /**
    * AngularJS Lifecycle hook used to initialize the controller
    *
    * @name Screen7Controller#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;
        $ctrl.userInfo = getSessionData();


        //  TODO: Integrate with microservice for Mambu
        //    model.doPost({"productName":"prouductTest"}).then((data) => {
        //      console.log("$S7 controller  model.doPost - server response =");
        //      console.log(data);
        //    })
        //    .catch(error => {
        //        $ctrl.error = errorMessage(error.code);
        //        bus.publish('widget-fob-screen-7-ng.load.failed', { error });
        //    })
        //    .then(() => { $ctrl.isLoading = false; });

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

    



    /*$ctrl.experienceName = 'future-of-banking';*/
    $ctrl.experienceName=getPortalName('retail-banking-demo');


    $ctrl.moveToPreviousScreen = function() {
        if ($ctrl.primaryScreen){
                window.location.href = CreateURL('register-or-login');
        } else {
            $ctrl.primaryScreen = true;
        }
    }


    $ctrl.moveToNextScreen = function(){
        if ($ctrl.primaryScreen){
            $ctrl.primaryScreen = false;
        } else {
            window.location.href = CreateURL('onboard-personal-info');
        }
    }


    $ctrl.moveToInitialScreen = function() {
        $ctrl.primaryScreen = true;
    }


    $ctrl.productInfo = function(item) {
        console.log("This is product info");
        $ctrl.modalNotReadyOptions = false;
        $ctrl.modalProductInfo = true;
        $ctrl.productInfoObj = item;
    }

    function getPortalName(defaultPortalName) {
        return window._portalConfiguration && window._portalConfiguration.portalName
          ? window._portalConfiguration.portalName
          : defaultPortalName;
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
        return CryptoJS.AES.encrypt(JSON.stringify(data),CryptoJS.AES.getFobKey() );
    }


    function decryptData(data) {
        return JSON.parse(CryptoJS.AES.decrypt(data,CryptoJS.AES.getFobKey()).toString(CryptoJS.enc.Utf8));
    }

    function getProductMarketValue(selectedGoal){
        var data = getSessionData();
        var selectedGoalKey = data['goalKey']
        
        switch(selectedGoalKey){
            case "43256h5h432" : /*Build Emergency Fund*/
                    return ['12','82','6'];
            break;

            case "jd956h5re3uu9" : /*Pay off Debt*/
                   return ['14','5','81'];
            break;

            case "fj7j76tuj849f940" : /*Save for retirement*/
                   return ['87','10','3'];
            break;

            case "abc12345" : /*Saving for a Dream Vacation*/
                    return ['75','5','20'];
            break;

            case "abc12356" : /*Saving for a House*/
                   return ['79','7','14'];
            break;

            case "abc124567" : /*Saving for College*/
                   return ['67','19','14'];
            break;

            case "abc123458" : /*Saving to Start a Business*/
                    return ['76','16','8'];
            break;

            case "abc123569" : /*Saving to Get Married*/
                   return ['65','9','26'];
            break;

            case "abc124560" : /*Saving to start a family / have a baby*/
                   return ['83','13','4'];
            break;

            case "abc124578" : /*Insuring my family's financial stability in the event of severe health issue or death */
                   return ['24','63','13'];
            break;

            default : 
                return ['50','25','25'];   
        }

    }
}