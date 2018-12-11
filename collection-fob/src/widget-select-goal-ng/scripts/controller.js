/**
 * @module widget-select-goal-ng
 * @name GoalController
 *
 * @description
 * Goal
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';


const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');


export default function GoalController(bus, hooks, widget, model) {
    const $ctrl = this;
    /**
    * AngularJS Lifecycle hook used to initialize the controller
    *
    * @name GoalController#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;
        /* FOB Experience */
        /*$ctrl.experienceName = 'future-of-banking';*/
        $ctrl.experienceName=getPortalName('retail-banking-demo');

        $ctrl.moveToNextScreen = function() {
            window.location.href = CreateURL('select-tips');
        };
        $ctrl.moveToPreviousScreen = function() {
            window.location.href = CreateURL('user-info');
        };

        $ctrl.goals = [];
        $ctrl.goalsCount = 0;
        $ctrl.btn = [];
        $ctrl.icons =[];
        $ctrl.displayButtonCount = 3;
        $ctrl.seeMoreButtonEnabled = getSeeMoreButtonEnabled();
        $ctrl.seeMoreButtonColor = getSeeMoreButtonColor();

        doPost();

        bus.publish('cxp.item.loaded', {
            id: widget.getId(),
        });

        bus.publish('bb.item.loaded', {
            id: widget.getId(),
        });

        $ctrl.isLoading = false;
    }; // end of OnInit() function



    Object.assign($ctrl, {
        $onInit,
        items: null,
        isLoading: false,
        error: null,
    });

//---------------------------------------------------------------------------------
//  FOB  FUNCTIONS
//---------------------------------------------------------------------------------
    

    $ctrl.tapButton = function (buttonIndex) {
        saveSelectedGoal(buttonIndex);
        $ctrl.moveToNextScreen();
    }

    $ctrl.seeMoreTap = function() {
        $ctrl.displayButtonCount += 3;
        if($ctrl.displayButtonCount >= $ctrl.goalsCount){
            $ctrl.seeMoreButtonEnabled = true;
            $ctrl.seeMoreButtonColor = getSeeMoreButtonColor();
        }

        console.log("Display button count is now: " + $ctrl.displayButtonCount);
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

    function doPost(){
        model.doPost(createRequest())
            .then((data) => {
                console.log('data.message: ' + data.message);
                switch (data.message) {
                    case 'success':
                    case 'Success':
                        saveDataToSession(data);
                        $ctrl.goals = data.goals;
                        $ctrl.btn = getGoalButtons($ctrl.goals);
                        $ctrl.icons   = getGoalIcons($ctrl.btn);  
                        break;
                    case 'Request Failed':
                        console.log("request failed");
                        var mockResponse = createMockResponseGoals();
                        saveDataToSession(mockResponse);
                        $ctrl.goals = mockResponse.goals;
                        $ctrl.btn = getGoalButtons($ctrl.goals);
                        $ctrl.icons   = getGoalIcons($ctrl.btn);  
                        break;
                    default:
                        alert('A networking error occurred, please try again later');
                        console.log("default switch");
                        var mockResponse = createMockResponseGoals();
                        saveDataToSession(mockResponse);
                        $ctrl.goals = mockResponse.goals;
                        $ctrl.btn = getGoalButtons($ctrl.goals);
                        $ctrl.icons   = getGoalIcons($ctrl.btn);  
                        break;
                }
            }).catch(error => {
                $ctrl.error = errorMessage(error.code);
                bus.publish('widget-select-goal-ng.load.failed', { error });

                console.log('Error: .catch(error =>');
                console.log(error);
                console.log("before mockresponse");
                var mockResponse = createMockResponseGoals();
                console.log("after mockresponse");
                console.log(mockResponse);
                console.log("beforesavedatatosession");
                saveDataToSession(mockResponse);
                console.log("aftersavedatatosession");

                $ctrl.goals = mockResponse.goals;
                $ctrl.btn = getGoalButtons($ctrl.goals);
                $ctrl.icons   = getGoalIcons($ctrl.btn);  
            }); // end of doPost()
    }

    // function doPost(){
    //     model.doPost(createRequest())
    //         .then((data) => {
    //             try {
    //                 console.log('try');
    //                 saveDataToSession(data);
    //                 $ctrl.goals = data.goals;
    //                 $ctrl.btn = getGoalButtons($ctrl.goals);
    //                 $ctrl.icons   = getGoalIcons($ctrl.btn);  
    //             }
    //             catch (err) {
    //                 console.log('Error: model.doPost(createRequest()) -->');
    //                 console.log(err);

    //                 var mockResponse = createMockResponseGoals();
    //                 saveDataToSession(mockResponse);
    //                 $ctrl.goals = mockResponse.goals;
    //                 console.log("catch");
    //                 $ctrl.btn = getGoalButtons($ctrl.goals);
    //                 $ctrl.icons   = getGoalIcons($ctrl.btn);  
    //             }
    //         }).catch(error => {
    //             $ctrl.error = errorMessage(error.code);
    //             bus.publish('widget-select-goal-ng.load.failed', { error });

    //             console.log('Error: .catch(error =>');
    //             console.log(error);
    //             console.log("before mockresponse");
    //             var mockResponse = createMockResponseGoals();
    //             console.log("after mockresponse");
    //             console.log(mockResponse);
    //             console.log("beforesavedatatosession");
    //             saveDataToSession(mockResponse);
    //             console.log("aftersavedatatosession");

    //             $ctrl.goals = mockResponse.goals;
    //             $ctrl.btn = getGoalButtons($ctrl.goals);
    //             $ctrl.icons   = getGoalIcons($ctrl.btn);  
    //         }); // end of doPost()
    // }


    function createRequest() {
        try {
            var prospectData = getSessionData();
            if (prospectData != null) {
                return({
                    "age": prospectData.age,
                    "householdIncome": prospectData.earning.amount,
                    "postalCode": prospectData.postalCode,
                    "countryCode": prospectData.countryCode,
                    "investableAssets": prospectData.investableAssets.amount
                });
            }
        }
        catch (err) {
            console.log('Error creating CIP request. Hardcoding values...');
            console.log(err);

            return({
                "age": 25,
                "householdIncome": "$100,000 to $249,999",
                "postalCode": "10017",
                "countryCode": "US",
                "investableAssets": "$25,000 to $49,999"
            });
        }  // end of Catch()
    }  // end of createRequest()


    function saveSelectedGoal(userSelection) {
        var prospectData = getSessionData();
        prospectData['selectedGoal'] = userSelection;
        prospectData['goalKey'] = $ctrl.goals[userSelection].goalKey;
        sessionStorage.setItem("userInfo", encryptData(prospectData));
    }


    function saveDataToSession(data) {
        try {
            var prospectData = getSessionData();
            if(data){
                prospectData['segmentKey'] = data.segmentKey || "";
                prospectData['tips'] = validateTips(data.tips);
                prospectData['goals'] = data.goals;
                sessionStorage.setItem("userInfo", encryptData(prospectData));
            }
        }
        catch (err) {
            console.log('Error: addSegmentToSession... nothing is saved.');
            console.log(err);
        }
    }


    function getSeeMoreButtonEnabled() {
        if($ctrl.displayButtonCount >= $ctrl.goalsCount){
                return true;
            } else {
                return false;
            }
    }


    function getGoalButtons(goals) {

        try {
            var goalValArray = [];
            for (var idx in goals) {
                goalValArray.push(goals[idx].goalValue);
            }

            $ctrl.goalsCount = goalValArray.length;
            return(goalValArray);
        }
        catch (err) {
            console.log('Error getting goals for the buttons. Hardcoding values...');
            console.log(err);

            var exampleGoals = ["Build emergency fund", "Pay off debt", "Save for retirement"];
            $ctrl.goalsCount = exampleGoals.length;
            return(exampleGoals);
        }
     
    }

    function getGoalIcons(goalValArray) {
        var goalIcons = [];
        for (var i =0 ; i < goalValArray.length; i++) {
            if(!goalValArray[i]) { continue; }

            if(goalValArray[i].toLowerCase().indexOf("business") != -1 ){

                goalIcons[i] = "business.png";
            }

            if(goalValArray[i].toLowerCase().indexOf("fund") != -1 ){

                goalIcons[i] = "fund.png";
            }


            if(goalValArray[i].toLowerCase().indexOf("house") != -1 ){

                goalIcons[i] = "house.png";
            }

            if(goalValArray[i].toLowerCase().indexOf("married") != -1 ){

                goalIcons[i] = "married.png";
            }

            if(goalValArray[i].toLowerCase().indexOf("debt") != -1 ){

                goalIcons[i] = "debt.png";
            }
            if(goalValArray[i].toLowerCase().indexOf("retirement") != -1 ){

                goalIcons[i] = "retirement.png";
            }

            if(goalValArray[i].toLowerCase().indexOf("vacation") != -1 ){

                goalIcons[i] = "vacation.png";
            }

            if(goalValArray[i].toLowerCase().indexOf("health") != -1 ){

                goalIcons[i] = "health.png";
            }

            if(goalValArray[i].toLowerCase().indexOf("family") != -1 ){

                goalIcons[i] = "family.png";
            }

            if(!goalValArray[i]){
                goalIcons[i] = "family.png";
            }
        }
        return goalIcons;
    }

    function validateTips(tips) {
        try {
            if (tips.length > 0) {
                return tips;
            } else {
                console.log("no tips received, hardcoding tip values");
                return ["Stick to a budget", "Save a portion of my paycheck", "Contribute to my savings"];
            }
        }
        catch (err) {
            console.log('Error pulling tips. Hardcoding values.');
            console.log(err);
            return ["Stick to a budget", "Save a portion of my paycheck", "Contribute to my savings"];
        }
    }


    function createMockResponseGoals() {
        console.log('Creating mock data for CIP goals...');
        return(
        {       
          "message": "Success",
          "segmentKey": "01-the-wealth-market",
          "segmentValue": "GenerationX_Male",
          "goals": [
            {
              "goalKey": "43256h5h432",
              "goalValue": "Build emergency fund"
            },
            {
              "goalKey": "jd956h5re3uu9",
              "goalValue": "Pay off debt"
            },
            {
              "goalKey": "fj7j76tuj849f940",
              "goalValue": "Save for retirement"
            }
          ],
          "tips": [
            "Stick to a budget",
            "Save a portion of my paycheck",
            "Contribute to my savings"
          ]
        }
        ); // end of return()
    } // end of function()


    function getSeeMoreButtonColor() {
        if($ctrl.seeMoreButtonEnabled) {
            return { 'color': '#a6a4a4', 'border-bottom' : '1px solid #a6a4a4' }
        } else {
            return { 'color': '#0092AC', 'border-bottom' : '1px solid #0092AC'}
        }
    }


} // end of export statement