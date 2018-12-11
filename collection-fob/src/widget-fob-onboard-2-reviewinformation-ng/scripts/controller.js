/**
 * @module widget-fob-onboard-2-reviewinformation-ng
 * @name Onboard2ReviewinformationController
 *
 * @description
 * Onboard 2 reviewinformation
 */


import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';

const errorMessage = (code) => ({
    [E_AUTH]: 'error.load.auth',
    [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');

export default function Onboard2ReviewinformationController(bus, hooks, widget, model,$scope) {
    const $ctrl = this;
    

    /**
    * AngularJS Lifecycle hook used to initialize the controller
    *
    * @name Onboard2ReviewinformationController#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;

        /*$ctrl.experienceName = 'future-of-banking';*/
        $ctrl.experienceName=getPortalName('retail-banking-demo');

        $ctrl.userInfo = getSessionData();
        if(!$ctrl.userInfo){
            $ctrl.userInfo = {};
            $ctrl.userInfo.firstName = "Mary";
            $ctrl.userInfo.lastName = "Doe";
            $ctrl.userInfo.postalCodeCityName = "New York";
            $ctrl.userInfo.postalCode = "11111";
            $ctrl.userInfo.residentialAddress = "1 Wonderful Lane";
            $ctrl.userInfo.phone = "(123)-456-7891";
            $ctrl.userInfo.ssid = "123456789";
            $ctrl.userInfo.citizenship = "USCITIZEN";
            $ctrl.userInfo.state = "NY";
            $ctrl.userInfo.dob = "2000-01-01";
        }
        
        if($ctrl.userInfo && $ctrl.userInfo.dob){
            if(($ctrl.userInfo.dob).indexOf("T") != -1){
                var part1 = $ctrl.userInfo.dob.split("T");
                $ctrl.userInfo.dob = part1[0];
            }
            var part = $ctrl.userInfo.dob.split("-");
            var newMonth = part[1] - 1;
            $scope.datofbirth = new Date(part[0],newMonth,part[2]);
        }   


         $ctrl.usStatesOptions = [

            { "id": 0, "stateCode": "STATE" },
            { "id": 1, "stateCode": "AL" },
            { "id": 2, "stateCode": "AK" },
            { "id": 3, "stateCode": "AS" },
            { "id": 4, "stateCode": "AZ" },
            { "id": 5, "stateCode": "AR" },
            { "id": 6, "stateCode": "CA" },
            { "id": 7, "stateCode": "CO" },
            { "id": 8, "stateCode": "CT" },
            { "id": 9, "stateCode": "DE" },
            { "id": 10, "stateCode": "DC" },
            { "id": 11, "stateCode": "FM"},
            { "id": 12, "stateCode": "FL"},
            { "id": 13, "stateCode": "GA" },
            { "id": 14, "stateCode": "GU" },
            { "id": 15, "stateCode": "HI" },
            { "id": 16, "stateCode": "ID" },
            { "id": 17, "stateCode": "IL" },
            { "id": 18, "stateCode": "IN" },
            { "id": 19, "stateCode": "IA" },
            { "id": 20, "stateCode": "KS" },
            { "id": 21, "stateCode": "KY" },
            { "id": 22, "stateCode": "LA" },
            { "id": 23, "stateCode": "ME" },
            { "id": 24, "stateCode": "MH" },
            { "id": 25, "stateCode": "MD" },
            { "id": 26, "stateCode": "MA" },
            { "id": 27, "stateCode": "MI" },
            { "id": 28, "stateCode": "MN" },
            { "id": 29, "stateCode": "BW" },
            { "id": 30, "stateCode": "MS" },
            { "id": 31, "stateCode": "MO" },
            { "id": 32, "stateCode": "MT" },
            { "id": 33, "stateCode": "NE" },
            { "id": 34, "stateCode": "NV" },
            { "id": 35, "stateCode": "NH" },
            { "id": 36, "stateCode": "NJ" },
            { "id": 37, "stateCode": "NM" },
            { "id": 38, "stateCode": "NY" },
            { "id": 39, "stateCode": "NC" },
            { "id": 40, "stateCode": "ND" },
            { "id": 41, "stateCode": "MP" },
            { "id": 42, "stateCode": "OH" },
            { "id": 43, "stateCode": "OK" },
            { "id": 44, "stateCode": "OR" },
            { "id": 45, "stateCode": "PW" },
            { "id": 46, "stateCode": "PA" },
            { "id": 47, "stateCode": "PR" },
            { "id": 48, "stateCode": "RI" },
            { "id": 49, "stateCode": "SC" },
            { "id": 50, "stateCode": "SD" },
            { "id": 51, "stateCode": "TN" },
            { "id": 52, "stateCode": "TX" },
            { "id": 53, "stateCode": "UT" },
            { "id": 54, "stateCode": "VT" },
            { "id": 55, "stateCode": "VA" },
            { "id": 56, "stateCode": "WA" },
            { "id": 57, "stateCode": "WV" },
            { "id": 58, "stateCode": "WI" },
            { "id": 58, "stateCode": "WY" }
            
        ];
        
        if ($ctrl.userInfo.state != null) {
            for(var key in $ctrl.usStatesOptions) {
                var val = $ctrl.usStatesOptions[key];
                if ($ctrl.userInfo.state === val.stateCode) {
                    $ctrl.selectedState = $ctrl.usStatesOptions[key];        
                }
            }

        } else {
            console.log("defaulting to none");
            $ctrl.selectedState = $ctrl.usStatesOptions[0];    
        }
        

        model.load()
            .then(loaded => {
                $ctrl.items = hooks.itemsFromModel(loaded);
            })
            .catch(error => {
                $ctrl.error = errorMessage(error.code);
                bus.publish('widget-fob-onboard-2-reviewinformation-ng.load.failed', { error });
            })
            .then(() => {  });

        bus.publish('cxp.item.loaded', { id: widget.getId(), });

        bus.publish('bb.item.loaded', { id: widget.getId(), });
        $ctrl.isLoading = false;
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

    function saveSessionData(){
        try {
            sessionStorage.setItem("userInfo", encryptData($ctrl.userInfo));
        }
        catch (err) {
            console.log('Error: saveSessionData()');
            console.log(err);
            return {};
        }
    }    


    function CreateURL(nextPageName) {
        var url = '/gateway/' + $ctrl.experienceName + '/' + nextPageName;
        return url;
    }

    $ctrl.moveToPreviousScreen = function() {
        window.location.href = CreateURL('enter-required-info');
    }

    $ctrl.moveToNextScreen = function() {
        if(isValidForm()){
            window.location.href = CreateURL('terms');
            saveSessionData();
        }    
    }

    function isValidForm() {
        
        if (!$ctrl.userInfo.firstName || !$ctrl.userInfo.lastName) {
            alert('Please enter your first and last name.');
            return false;
        }

        if (!$ctrl.userInfo.streetAddress) {
            alert('Please enter street address');
            return false;
        }
        if (!$ctrl.userInfo.postalCodeCityName) {
            alert('Please enter city name');
            return false;
        }
        if ($ctrl.selectedState.stateCode === 'STATE') {
            alert('Please select state you live in.');
            return false;
        }

        if (!validateZip($ctrl.userInfo.postalCode)) {
            alert('Please enter valid zip code');
            return false;
        }
        if (!validatePhone($ctrl.userInfo.phone)) {
            alert('Please enter valid phone number.');
            return false;
        }


        if (!isValidSsn($ctrl.userInfo.ssid)) {
            alert('Please enter valid SSN.');
            return false;
        }
        return true
    }

    function validatePhone(num) {
        var phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
        if (!phoneRegex.test(num)) {
            return false;
        }
        return true;
    }

    function validateZip(num) {
        var zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;;
        if (!zipRegex.test(num)) {
            return false;
        }
        return true;
    }

    function isValidSsn(num) { 
        var SSNRegex = new RegExp('^(?!000)(?!666)(?!9)\\d{3}[- ]?(?!00)\\d{2}[- ]?(?!0000)\\d{4}$');
        if(!SSNRegex.test(num)){
            alert("Please enter valid SSN");
            return false;
        }
        return true;
    }

    $ctrl.formatSsn = function(ssn){

        if (ssn && ssn.length === 11){
            return ssn;
        }    
        var val = ssn.replace(/\D/g, '');
         
        var newVal = '';
         if(val.length > 4) {
             ssn = val;
         }
         if((val.length > 3) && (val.length < 6)) {
             newVal += val.substr(0, 3) + '-';
             val = val.substr(3);
         }
         if (val.length > 5) {
             newVal += val.substr(0, 3) + '-';
             newVal += val.substr(3, 2) + '-';
             val = val.substr(5);
         }
         newVal += val;
         return newVal
    };

   
}