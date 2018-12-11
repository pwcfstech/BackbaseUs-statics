/**
 * @module widget-fob-onboardcurrentaddress-ng
 * @name OnboardcurrentaddressController
 *
 * @description
 * Address verification entry
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';


const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');


export default function OnboardcurrentaddressController(bus, hooks, widget, model) {
    const $ctrl = this;
   
    /**
    * AngularJS Lifecycle hook used to initialize the controller
    *
    * @name OnboardcurrentaddressController#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;
        $ctrl.userInfo = getSessionData();
        if ($ctrl.userInfo != null) {
            $ctrl.firstName = $ctrl.userInfo['firstName'];
            $ctrl.lastName = $ctrl.userInfo['lastName'];
            $ctrl.fullName = $ctrl.userInfo['firstName'] + ' ' + $ctrl.userInfo['lastName'];
            if ($ctrl.userInfo.postalCode != null || ''){
                $ctrl.zipcode = $ctrl.userInfo.postalCode;
            } else {
                $ctrl.zipcode = '10017';
            }
        } else {
            $ctrl.userInfo = {};
            console.log('Creating a blank cookie');
        }
        

        $ctrl.streetAddress=  '1 Wonderful Drive';
        $ctrl.city= 'New York';
        $ctrl.state = 'NY';
        
        // $ctrl.currentAddress = '1 Wonderful Drive, New York, NY 10017';
        $ctrl.dob = new Date('01/01/2000');
        $ctrl.mobilePhoneNumber='444-333-3123';

        /*$ctrl.experienceName = 'future-of-banking';*/
        $ctrl.experienceName=getPortalName('retail-banking-demo');

        $ctrl.moveToNextScreen = function() {
            if(isValidForm()){
                saveSessionData();
                window.location.href = CreateURL('enter-required-info');
            }
        };
        $ctrl.moveToPreviousScreen = function() {
            window.location.href = CreateURL('capture-id');
        };

        model.load()
            .then(loaded => {
            $ctrl.items = hooks.itemsFromModel(loaded);
        })
        .catch(error => {
            $ctrl.error = errorMessage(error.code);
            bus.publish('widget-fob-onboardcurrentaddress-ng.load.failed', { error });
        })
        .then(() => {  });

        bus.publish('cxp.item.loaded', {
            id: widget.getId(),
        });

        bus.publish('bb.item.loaded', {
            id: widget.getId(),
        });


        $ctrl.usStatesOptions = [

            { "id": 0, "stateCode": "STATE" },
            { "id": 1, "stateCode": "AL"  },
            { "id": 2, "stateCode": "AK"  },
            { "id": 3, "stateCode": "AS"  },
            { "id": 4, "stateCode": "AZ"  },
            { "id": 5, "stateCode": "AR"  },
            { "id": 6, "stateCode": "CA"  },
            { "id": 7, "stateCode": "CO"  },
            { "id": 8, "stateCode": "CT"  },
            { "id": 9, "stateCode": "DE"  },
            { "id": 10, "stateCode": "DC" },
            { "id": 11, "stateCode": "FM" },
            { "id": 12, "stateCode": "FL" },
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

        $ctrl.selectedState = $ctrl.usStatesOptions[38];

        $ctrl.isLoading = false;
    };


    Object.assign($ctrl, {
        $onInit,
        items: null,
        isLoading: false,
        error: null,
    });

    function getPortalName(defaultPortalName) {
        return window._portalConfiguration && window._portalConfiguration.portalName
          ? window._portalConfiguration.portalName
          : defaultPortalName;
      } 


    function isValidForm() {

        if (!$ctrl.firstName  || !$ctrl.lastName) {
            alert('Please enter your first and last name.');
            return false;
        }
        
        if( !$ctrl.streetAddress ){
            alert('Please enter street address');
            return false;
        }
        if (!$ctrl.city) {
            alert('Please enter city name');
            return false;
        }
        if ($ctrl.selectedState.stateCode ==='STATE' ) {
            alert('Please select state you live in.');
            return false;
        }
     
        if(!validateZip($ctrl.zipcode)){
            alert('Please enter valid zip code');
            return false;
        }
       if(!validatePhone($ctrl.mobilePhoneNumber)){
            alert('Please enter valid phone number');
            return false;
        }
        return true
    }

    function validatePhone(num){
        var phoneRegex =  /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
        if(!phoneRegex.test(num)){
            return false;
        }
        return true;
    }

    function validateZip(num){
        var zipRegex =   /(^\d{5}$)|(^\d{5}-\d{4}$)/;;
        if(!zipRegex.test(num)){
            return false;
        }
      return true;
    }
    
     $ctrl.formatPhoneNumber = function(phone){

        if (phone.length === 12){
            return phone;
        }    
        var val = phone.replace(/\D/g, '');
         
        var newVal = '';
         
         if((val.length > 3) && (val.length < 6)) {
             newVal += val.substr(0, 3) + '-';
             val = val.substr(3);
         }
         if (val.length === 5) {
            newVal += val.substr(0, 3) + '-';
            newVal += val.substr(3, 3) + '-';
            val = val.substr(6);
         }
         if (val.length > 6) {
             newVal += val.substr(0, 3) + '-';
             newVal += val.substr(3, 3) + '-';
             val = val.substr(6);
         }
         newVal += val;
         return newVal
    };


    function CreateURL(nextPageName) {
        var url = '/gateway/' + $ctrl.experienceName + '/' + nextPageName;
        return url;
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
        return CryptoJS.AES.encrypt(JSON.stringify(data),CryptoJS.AES.getFobKey());
    }


    function decryptData(data) {
        return JSON.parse(CryptoJS.AES.decrypt(data,CryptoJS.AES.getFobKey()).toString(CryptoJS.enc.Utf8));
    }


    function saveSessionData(){
        if($ctrl.dob != null){
            var formatted = $ctrl.dob.toISOString();
            console.log('formatted: ' + formatted);

            if((formatted).indexOf("T") != -1){
                var part1 = formatted.split("T");
                $ctrl.userInfo['dob'] = part1[0];
            } else {
                $ctrl.userInfo['dob'] = formatted;
            }
        }
        else {
            console.log('DOB is null');
        }

        if ($ctrl.mobilePhoneNumber != null){
            $ctrl.userInfo.phone = $ctrl.mobilePhoneNumber;
        }
        if ($ctrl.selectedState.stateCode != null) {
            $ctrl.userInfo.state = $ctrl.selectedState.stateCode;    
        }
        if ($ctrl.streetAddress != null) {
            $ctrl.userInfo.streetAddress = $ctrl.streetAddress;    
        }
        if ($ctrl.city != null) {
            $ctrl.userInfo.postalCodeCityName = $ctrl.city;
        }
        if($ctrl.zipcode != null){
            $ctrl.userInfo.postalCode = $ctrl.zipcode;
        }
        try {
            sessionStorage.setItem("userInfo", encryptData($ctrl.userInfo));
        }
        catch (err) {
            console.log('Error: saveSessionData()');
            console.log(err);
            return {};
        }
    }
}