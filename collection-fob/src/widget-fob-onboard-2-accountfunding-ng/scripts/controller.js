/**
 * @module widget-fob-onboard-2-accountfunding-ng
 * @name Onboard2AccountfundingController
 *
 * @description
 * Screen 10 mambu api
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';


const errorMessage = (code) => ({
    [E_AUTH]: 'error.load.auth',
    [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');


export default function Onboard2AccountfundingController(bus, hooks, widget, model) {
    const $ctrl = this;
    $ctrl.CreateURL = function (experienceName, nextPageName) {
        var url = '/gateway/' + experienceName + '/' + nextPageName;
        console.log('Created path: ' + url);
        return url;
      }
    // $ctrl.modalOption = false;
    $ctrl.fundingAmount = 0.00;
    $ctrl.fundingInstitutions = ["Bank of America", "Chase", "Wells Fargo"];
    
    /**
    * AngularJS Lifecycle hook used to initialize the controller
    *
    * @name Onboard2AccountfundingController#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;
        $ctrl.fundingInstitution = '';    
        $ctrl.transferDate = '';
        $ctrl.primaryScreen = true;
        $ctrl.isLoading = false;

        $ctrl.experienceName=getPortalName('retail-banking-demo');

        $ctrl.previousPageURL = $ctrl.CreateURL($ctrl.experienceName, 'congrats-onboarding-complete');



            $ctrl.moveToPreviousScreen = function () {
              window.location.href = $ctrl.previousPageURL;
            }


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
    $ctrl.transferToBank = function () {
        if ($ctrl.experienceName == 'future-of-banking2') {
            return  "Sun Trust";
        }else{
            return "Future Bank";
        }
    }

    $ctrl.modalOpen = function() {
        if ($ctrl.fundingAmount < 1) {
           alert("Please enter an amount that is greater than $0 for us to transfer into your account");
        } else if ($ctrl.fundingInstitution == '') {
            alert("Please provide a funding institution");
        } else if ($ctrl.transferDate == '') {
            alert("Please provide a funding date");
        } else {
            doPost();          
            $ctrl.primaryScreen = false; 
        }
    }

    function getPortalName(defaultPortalName) {
        return window._portalConfiguration && window._portalConfiguration.portalName
          ? window._portalConfiguration.portalName
          : defaultPortalName;
      }
    function createRequest(storedData) {
        console.log('createRequest().storedData = ');
        storedData = preprocessStoredData(storedData);
        console.log(storedData);
        try {
            return({
               "client": {
                   "firstName": storedData.firstName,
                   "lastName": storedData.lastName,
                   "email": storedData.email,
                   "mobilePhone": storedData.phone,
                   "birthdate": storedData.dob,
                   "addressLine1": storedData.residentialAddress,
                   "city": storedData.postalCodeCityName,
                   "state": storedData.state,
                   "postalCode": storedData.postalCode,
                    //"homePhone": storedData.homePhone,
                    //mobilePhone": storedData.mobilePhone,
                    //"birthdate": storedData.birthdate,
                    //"gender": storedData.gender,
                    //"addressLine1": storedData.addressLine1,
                    //"city": storedData.city,
                    //"state": storedData.state,
                    //"postalCode": storedData.postalCode,
                    //"countryCode": storedData.countryCode
               },
               "account": {
                    //"accountName": storedData.accountName,
                    "productTypeKey": storedData.productTypeKey,
                    "allowOverdraft": storedData.allowOverdraft,
                    "overdraftLimit": storedData.overdraftLimit
               },
               "transaction": {
                   "transactionType": "Deposit", //hardcoding until later storedData.transactionType
                   "amount": $ctrl.fundingAmount
               },
               "leadKey": storedData.leadKey
           });
        }
        catch (err) {
            console.log(err);
            console.log('Error creating new account creation service request. Hardcoding values...');
            return({
                "client": {
                    "firstName": "Max",
                    "middleName": "Frank",
                    "lastName": "Alexander",
                    "email": "max.alexander@mambu.com",
                    "homePhone": "56611235498",
                    "mobilePhone": "211111111",
                    "birthdate": "1990-07-08",
                    "gender": "MALE",
                    "addressLine1": "13161 Brayton Drive",
                    "city": "Anchorage",
                    "state": "AK",
                    "postalCode": "99516",
                    "countryCode": "US"
                },
                "account": {
                    "accountName": "Test Create Saving Account",
                    "productTypeKey": "8a81874f64d102910164d1abfcde13a4",
                    "allowOverdraft": true,
                    "overdraftLimit": "100"
                },
                "transaction": {
                    "transactionType": "Deposit",
                    "amount": 1000.5
                },
                "leadKey": "00Q3B000005CSmjUAG"
            });

        }  // end of Catch()
    }  // end of createRequest()


    function preprocessStoredData(storedData) {
    /*
    This function ensures we pass the mandatory parameters to Mambu
    for demo purposes, and would not be used in actual client production
    */

            if (storedData.allowOverdraft == undefined || null) {
                storedData.allowOverdraft = true;
                console.log('allowOverdraft was undefined. Hardcoding to TRUE');
            }
            if (storedData.overdraftLimit == undefined || null) {
                storedData.overdraftLimit = "0";
                console.log('overdraftLimit was undefined. Hardcoding to 0');
            }
            if (storedData.productTypeKey == undefined || null) {
                storedData.productTypeKey = "8a81874f64d102910164d1abfcde13a4";
                console.log('productTypeKey was undefined. Hardcoding to 8a81874f64d102910164d1abfcde13a4');
            }
            return storedData;
    }


    // function doPost() {
    //     $ctrl.isLoading = true;
    //     $ctrl.userInfo = getSessionData();

    //     model.doPost(createRequest($ctrl.userInfo))
    //         .then((data) => {
    //             console.log('doPost.then((data) ==>');
    //         })
    //         .catch(error => {
    //             $ctrl.error = errorMessage(error.code);
    //             console.log(error);
    //         })
    //         .then(() => {
    //             $ctrl.isLoading = false;
    //         });
    // }
    function doPost() {
        $ctrl.isLoading = true;
        $ctrl.userInfo = getSessionData();

        model.doPost(createRequest($ctrl.userInfo))
            .then((data) => {
                switch (data.message) {
                    case 'success':
                    case 'Success':
                        alert('Transfer Succeeded!');
                        console.log('doPost.then((data) ==>');
                        break;
                    case 'Request Failed':
                        console.log("requestfailed");
                        break;
                    default:
                        console.log("default case");
                        alert('A networking error occurred, please try again later');
                        break;
                }
            })
            .catch(error => {
                $ctrl.error = errorMessage(error.code);
                console.log(error);
            })
            .then(() => {
                $ctrl.isLoading = false;
            });
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