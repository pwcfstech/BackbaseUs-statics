/**
 * @module widget-fob-userinfo-ng
 * @name UserinfoController
 *
 * @description
 * Userinfo
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';


const errorMessage = (code) => ({
    [E_AUTH]: 'error.load.auth',
    [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');

export default function UserinfoController(bus, hooks, widget, model) {

    const $ctrl = this;
    /**
    * AngularJS Lifecycle hook used to initialize the controller
    *
    * @name UserinfoController#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;

        /* FOB Experience */
        /*$ctrl.experienceName = 'future-of-banking';*/
        $ctrl.experienceName=getPortalName('retail-banking-demo');

        $ctrl.moveToNextScreen = function () {
            if ($ctrl.userInfoObj.age == '') {
                alert("All fields are required");
            } else if ($ctrl.userInfoObj.postalCode == '') {
                alert("All fields are required");
            } else if ($ctrl.userInfoObj.postalCodeCityName == '') {
                alert("All fields are required");
            } else if ($ctrl.userInfoObj.earning == '') {
                alert("All fields are required");
            } else if ($ctrl.userInfoObj.investableAssets == '') {
                alert("All fields are required");
            } else if (saveDataToSession() && !$ctrl.isLoading) {
                window.location.href = CreateURL('select-goals');
            } else {
                console.log("Controller is still loading");
            }
        };

        $ctrl.moveToPreviousScreen = function () {
            window.location.href = CreateURL('index');
        };

        //initialize user info object from sesssion / create new one.
        initUserModel();


        bus.publish('cxp.item.loaded', { id: widget.getId(), });
        bus.publish('bb.item.loaded', { id: widget.getId(), });

        $ctrl.isLoading = false;
    }; // end of OnInit()


    Object.assign($ctrl, {
        $onInit,
        items: null,
        isLoading: false,
        error: null,
    }); // end of assign()


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


    function initUserModel() {
        try {
            $ctrl.userInfoObj = getSessionData();

            $ctrl.earningOptions = [
                { amount: "Under $10,000", alias: "Under $10K", id: "1" },
                { amount: "$10,000 to $19,999", alias: "$10K to $20K", id: "2" },
                { amount: "$20,000 to $49,999", alias: "$20K to $50K", id: "3" },
                { amount: "$50,000 to $74,999", alias: "$50K to $75K", id: "4" },
                { amount: "$75,000 to $99,999", alias: "$75K to $100K", id: "5" },
                { amount: "$100,000 to $149,999", alias: "$100K to $150K", id: "6" },
                { amount: "$150,000 to $199,999", alias: "$150K to $200K", id: "7" },
                { amount: "$200,000 or more", alias: "$200K or more", id: "8" },
            ];

            $ctrl.investmentOptions = [
                { amount: "Under $25,000", alias: "Under $25K", id: "1" },
                { amount: "$25,000 to $49,999", alias: "$25K to $50K", id: "2" },
                { amount: "$50,000 to $74,999", alias: "$50K to $75K", id: "3" },
                { amount: "$75,000 to $99,999", alias: "$75K to $100K", id: "4" },
                { amount: "$100,000 to $249,999", alias: "$100K to $250K", id: "5" },
                { amount: "$250,000 to $499,999", alias: "$250K to $500K", id: "6" },
                { amount: "$500,000 to $749,999", alias: "$500K to $750K", id: "7" },
                { amount: "$750,000 to $999,999", alias: "$750K to $1M", id: "8" },
                { amount: "$1,000,000 to $1,999,999", alias: "$1M to $2M", id: "9" },
                { amount: "$2,000,000 to $2,999,999", alias: "$2M to $3M", id: "10" },
                { amount: "$3,000,000 or more", alias: "$3M or more", id: "11" },
            ];
                
            if (!$ctrl.userInfoObj || !Object.keys($ctrl.userInfoObj).length) {
                //userInfoObject null/empty load defaults
               // $ctrl.userInfoObj = {};
                $ctrl.userInfoObj.age = 25;
                $ctrl.userInfoObj.postalCode = "10017";
                $ctrl.userInfoObj.postalCodeCityName = "New York";
                $ctrl.userInfoObj.countryCode = "US";
                $ctrl.userInfoObj.earning = $ctrl.earningOptions[4];
                $ctrl.userInfoObj.investableAssets = $ctrl.investmentOptions[2];
            }
        }
        catch (err) {
            console.log('Error: Initializing UserInfo object ');
            console.log(err);
            return {};
        }
    }


    $ctrl.clearText = function (item) {
        if (item == 'postalCode') {
            $ctrl.userInfoObj.postalCodeCityName = '';
        }
        else if (item == 'age') {
            $ctrl.userInfoObj.age = '';
        }
    }


    $ctrl.refreshCityName = function () {
        if ($ctrl.userInfoObj.postalCodeCityName == '' || $ctrl.userInfoObj.postalCodeCityName == undefined) {
            console.log('skipping blank request: ' + $ctrl.userInfoObj.postalCodeCityName);
            return;
        }

        $ctrl.isLoading = true;
        model.doPost(createRequest())
            .then((data) => {
                try {
                    $ctrl.userInfoObj.postalCodeCityName = processResponse(data);
                }
                catch (err) {
                    $ctrl.userInfoObj.postalCodeCityName = "Invalid request";
                }
            })
            .catch(error => {
                $ctrl.error = errorMessage(error.code);
                bus.publish('widget-select-goal-ng.load.failed', { error });
                console.log(".catch(error =>");
                console.log(error);
            })
            .then(() => {

                $ctrl.isLoading = false;
            }); // end of doPost()
    }


    function processResponse(data) {
        try {
            if (data.city === "Not a valid city. Please enter the correct postal code") {
                alert("Please enter a valid US Postal Code");
                return '';
            }
            return data.city;
        }
        catch (err) {
            console.log('Error: unable to processResponse()');
            console.log(err);
            return '';
        }
    }


    function createRequest() {
        $ctrl.userInfoObj.postalCode = $ctrl.userInfoObj.postalCodeCityName;
        console.log('Creating postal validation request: ' + $ctrl.userInfoObj.postalCode);

        try {
            return ({
                "postalCode": $ctrl.userInfoObj.postalCode,
                "countryCode": $ctrl.userInfoObj.countryCode
            });
        }
        catch (err) {
            console.log('Error creating Postal Validation request. Hardcoding values...');
            console.log(err);

            return ({
                "postalCode": "11206",
                "countryCode": "US"
            });
        }  // end of Catch()
    }  // end of createRequest()


    function CreateURL(nextPageName) {
        var url = '/gateway/' + $ctrl.experienceName + '/' + nextPageName;
        return url;
    }

    function isValidAge(num) {
        var isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
        return isNumeric.test(num)
    }

    function saveDataToSession() {
        if (!$ctrl.userInfoObj.age ||
            !$ctrl.userInfoObj.postalCodeCityName ||
            !$ctrl.userInfoObj.earning ||
            !$ctrl.userInfoObj.investableAssets) {
            alert('All fields are mandatory');
            return false;
        } else if (!isValidAge($ctrl.userInfoObj.age) || $ctrl.userInfoObj.age < 18 || $ctrl.userInfoObj.age > 100) {
            alert('Please enter a valid age');
            return false;
        } else {
            if ($ctrl.userInfoObj) {
                sessionStorage.setItem("userInfo", encryptData($ctrl.userInfoObj));
            }

            return true;
        }
    }

} 
