/**
 * @module widget-fob-toolsandservices-ng
 * @name ToolsandservicesController
 *
 * @description
 * Toolsandservices
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';


const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');


export default function ToolsandservicesController(bus, hooks, widget, model) {
    const $ctrl = this;
    

    /** AngularJS Lifecycle hook used to initialize the controller
    *
    * @name ToolsandservicesController#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;

        /* FOB Experience */
        /*$ctrl.experienceName = 'future-of-banking';*/
        $ctrl.experienceName=getPortalName('retail-banking-demo');

        $ctrl.moveToPreviousScreen = function() {
            $ctrl.mainToolsAndServicesScreen = true;
            $ctrl.feeSummaryScreen = false;
            window.location.href = CreateURL('select-tips');
        }

        $ctrl.moveToNextScreen = function(screen) {
            window.location.href = CreateURL('register-or-login');
        }

        $ctrl.moveToGoalsScreen = function(screen) {
            window.location.href = CreateURL('select-goals');
        }

        

        $ctrl.mainToolsAndServicesScreen = true;
        $ctrl.feeSummaryScreen = false;
        $ctrl.modalNotReadyOptions = true;
        $ctrl.modalChatOptions = false;
        $ctrl.modalStayInTouch = false;
        $ctrl.modalProductInfo = false;
        $ctrl.personalInfo = {};

        $ctrl.myInterval = 5000;
        $ctrl.noWrapSlides = false;
        
        var prospectData = getSessionData();
        // prospectData['selectedGoal'] = userSelection;
        // prospectData['goalKey'] = $ctrl.goals[userSelection].goalKey;

        $ctrl.slides = [
            {
                productName: "Goal Setting & Tracking Tool",
                productDesc:"People who use this tool save $XX money on average",
                id: 1
            },
            {
                productName: 'Automatic Saving Transfer',
                productDesc:"People who use this tool save $XX money on average",
                id: 2
            },
            {
                productName: 'Real Time Spending Alerts',
                productDesc:"People who use this tool save $XX money on average",
                id: 3
            }
        ]


        $ctrl.slides = getToolSlides(prospectData['goalKey']);



        $ctrl.toolsAndServices = [];

        bus.publish('cxp.item.loaded', {
            id: widget.getId(),
        });

        bus.publish('bb.item.loaded', {
            id: widget.getId(),
        });

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


    $ctrl.selectedModalOption = function(action) {
        if(action == 'free') {
            alert('Move to screen - Try our tools and services for free for x days');
        }
        else if(action == 'chat') {
            $ctrl.modalNotReadyOptions = false;
            $ctrl.modalChatOptions = true;
        }
        else if (action == 'explore') {
            $ctrl.moveToGoalsScreen();
        }
        else if(action == 'stay') {
            $ctrl.modalNotReadyOptions = false;
            $ctrl.modalChatOptions = false;
            $ctrl.modalStayInTouch = true;
        }
    }


    $ctrl.modalOpen = function() {
        $ctrl.modalProductInfo = false;
        $ctrl.modalNotReadyOptions = true;
        $ctrl.modalChatOptions = false;
        $ctrl.modalStayInTouch = false;
    }


    $ctrl.showMoreToolsAndServices = function() {
        alert('To be added - Show more Tools and Services');
    }


    $ctrl.showFeeStructureScreen = function() {
        $ctrl.mainToolsAndServicesScreen = false;
        $ctrl.feeSummaryScreen = true;
    }


    $ctrl.formSubmit = function() {
        if($ctrl.personalInfo.email != $ctrl.personalInfo.confirmEmail) {
            $ctrl.personalInfo.confirmEmail = '';
            alert("Email and Confirm Email doesn't match");
        }
        else {
            doPost();
            alert('Thank you !!');

            $ctrl.modalNotReadyOptions = true;
            $ctrl.modalStayInTouch = false;
        }
    }


    $ctrl.productInfo = function(item) {
        console.log("This is product Info ",item);
        $ctrl.modalNotReadyOptions = false;
        $ctrl.modalProductInfo = true;
        $ctrl.productInfoObj = item;
    }

    function getPortalName(defaultPortalName) {
        return window._portalConfiguration && window._portalConfiguration.portalName
          ? window._portalConfiguration.portalName
          : defaultPortalName;
      } 


    function CreateURL(nextPageName) {
        var url = '/gateway/' + $ctrl.experienceName + '/' + nextPageName;
        return url;
    }

    function doPost() {
        var storedData = getSessionData();
        console.log("Picked up stored data ...");
        console.log(storedData);

        model.doPost(createRequest(storedData))
            .then((data) => {

                switch (data.message) {
                    case 'success':
                    case 'Success':
                        storedData.leadKey = data.leadKey;
                        storedData.packages = data.packages;
                        break;
                    case 'Request Failed':
                        console.log("request failed");
                    break;
                    default:
                        console.log("default case");
                        alert('A networking error occurred, please try again later');
                    break;
                }
            })
            .catch(error => {
                $ctrl.error = errorMessage(error.code);
                bus.publish('widget-select-goal-ng.load.failed', { error });
                alert(data.message);
            })
            .then(() => {
                $ctrl.isLoading = false;
            });
            if(storedData){
                sessionStorage.setItem("userInfo", encryptData(storedData));     
            }   
    }
    // function doPost() {
    //     var storedData = getSessionData();
    //     console.log("Picked up stored data ...");
    //     console.log(storedData);

    //     model.doPost(createRequest(storedData))
    //         .then((data) => {
    //             storedData.leadKey = data.leadKey;
    //             storedData.packages = data.packages;
    //         })
    //         .catch(error => {
    //             $ctrl.error = errorMessage(error.code);
    //             bus.publish('widget-select-goal-ng.load.failed', { error });
    //             alert(data.message);
    //         })
    //         .then(() => {
    //             $ctrl.isLoading = false;
    //         });
    //         if(storedData){
    //             sessionStorage.setItem("userInfo", encryptData(storedData));     
    //         }
    // }


    function createRequest(storedData) {
        try {
            return({
                    "firstName": $ctrl.personalInfo.firstName,
                    "lastName": $ctrl.personalInfo.lastName,
                    "email": $ctrl.personalInfo.email,
                    "age": storedData.age,
                    "householdIncome": storedData.earning.amount,
                    "investableAssets": storedData.investableAssets.amount,
                    "postalCode": storedData.postalCode,
                    "countryCode": storedData.countryCode,
                    "segmentKey": storedData.segmentKey,
                    "goalKey": storedData.goalKey,
                    "stayInTouch": true,
                    "packagesPresented": false
                });
        }
        catch (err) {
            console.log('Error creating new prospect service request. Hardcoding values...');
            console.log(err);

            return({
                 "firstName": "Teddy",
                 "lastName": "Shevlin",
                 "email": "theodore.p.shevlin@pwc.com",
                 "age": 25,
                 "householdIncome": "$100,000 to $249,999",
                 "investableAssets": "Under $25,000",
                 "postalCode": "10017",
                 "countryCode": "US",
                 "segmentKey": "millenial-women-new-york-25-50-under-25",
                 "goalKey": "build_emergency_fund",
                 "stayInTouch": true,
                 "packagesPresented": false
            });
        }  // end of Catch()
    }  // end of createRequest()


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

    function getToolSlides(selectedGoal){

        switch(selectedGoal){
        /*Build Emergency Fund*/
            case "43256h5h432" : return [
                {
                    productName: 'Automatic Saving Transfer',
                    productDesc:"People who use this tool save $XX money on average",
                    id: 1
                },
                {
                    productName: "Goal Setting & Tracking Tool",
                    productDesc:"People who use this tool save $XX money on average",
                    id: 2
                },
                {
                    productName: 'Real Time Spending Alerts',
                    productDesc:"People who use this tool save $XX money on average",
                    id: 3
                }
            ];

            break;
        /*Pay off Debt*/
            case "jd956h5re3uu9" : return [
                {
                    productName: 'Real Time Spending Alerts',
                    productDesc:"People who use this tool save $XX money on average",
                    id: 1
                },
                {
                    productName: 'Automatic Saving Transfer',
                    productDesc:"People who use this tool save $XX money on average",             
                    id: 2
                },
                {
                    productName: "Goal Setting & Tracking Tool",
                    productDesc:"People who use this tool save $XX money on average",
                    id: 3
                }
            ];
            break;
        /*Insuring my family's financial stability in the event of severe health issue or death */
            case "abc124578" : return [
                {
                    productName: 'Automatic Saving Transfer',
                    productDesc:"People who use this tool save $XX money on average",
                    id: 1
                },
                {
                    productName: "Goal Setting & Tracking Tool",
                    productDesc:"People who use this tool save $XX money on average",
                    id: 2
                },
                {
                    productName: 'Real Time Spending Alerts',
                    productDesc:"People who use this tool save $XX money on average",
                    id: 3
                }
            ];

            default : return [
                {
                    productName: "Goal Setting & Tracking Tool",
                    productDesc:"People who use this tool save $XX money on average",
                    id: 1
                },
                {
                    productName: 'Automatic Saving Transfer',
                    productDesc:"People who use this tool save $XX money on average",
                    id: 2
                },
                {
                    productName: 'Real Time Spending Alerts',
                    productDesc:"People who use this tool save $XX money on average",
                    id: 3
                }
            ];

        }

    }
}

