/**
 * @module widget-fob-registerandlogin-ng
 * @name RegisterandloginController
 *
 * @description
 * Registerandlogin
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';


const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');


export default function RegisterandloginController(bus, hooks, widget, model) {
    const $ctrl = this;


    const $onInit = () => {
        $ctrl.isLoading = true;
        $ctrl.leadForm = true;
        /* $ctrl.userLogin = {};
        $ctrl.firstName = '';
        $ctrl.lastName = '';
        $ctrl.email = '';
        $ctrl.confirmEmail = '';
        $ctrl.inputType = 'password';
        */
        $ctrl.userInfo = getSessionData();
         if(Object.keys($ctrl.userInfo).length > 0 ){
            if($ctrl.userInfo.userName){$ctrl.userName = $ctrl.userInfo.userName};
                  /*$ctrl.username =   $ctrl.userInfo.username;*/
                  $ctrl.firstName =   $ctrl.userInfo.firstName;
                  $ctrl.lastName  =   $ctrl.userInfo.lastName;
                  $ctrl.email     =   $ctrl.userInfo.email;
                  $ctrl.confirmEmail =   $ctrl.userInfo.email;

                }
          else
          {
                  $ctrl.userLogin = {};
                  $ctrl.firstName = '';
                  $ctrl.lastName = '';
                  $ctrl.email = '';
                  $ctrl.confirmEmail = '';
                  $ctrl.inputType = 'password';
          };

        $ctrl.nextScreenButtonColor = getNextScreenButtonColor(false);

        /* FOB Experience */
        /*$ctrl.experienceName = 'future-of-banking';*/
        $ctrl.experienceName=getPortalName('retail-banking-demo');

        $ctrl.moveToPreviousScreen = function() {
            window.location.href = CreateURL('tools-and-services');
        }

        $ctrl.moveToNextScreen = function(screen) {
            console.log("test1");
            if(screen == 'register'){
                console.log("test2");
                if(checkFormButton()) {
                    console.log("test3");
                    doPost();
                }
                else {
                    console.log("test4");
                    return ;
                }
            } else if(screen == 'login') {
                console.log("test5");
                if(checkUserLoginForm()) {
                    console.log("test6");
//                    TODO: Add functionality to load username when user logs in
                    window.location.href = CreateURL('select-package');
                }
            }
        }

        bus.publish('cxp.item.loaded', {
          id: widget.getId(),
        });

        bus.publish('bb.item.loaded', {
          id: widget.getId(),
        });

        $ctrl.isLoading = false;
    };  // end of OnInit()


    Object.assign($ctrl, {
        $onInit,
        items: null,
        isLoading: false,
        error: null,
    });


//---------------------------------------------------------------------------------
//  FOB  FUNCTIONS
//---------------------------------------------------------------------------------

    $ctrl.showForgotPassScreen = function() {
        alert("Work in progress - To be added to the demo.");
    }


    $ctrl.toggleScreens = function() {
        if($ctrl.leadForm == true) {
            $ctrl.leadForm = false;
        } else {
            $ctrl.leadForm = true;
        }
    }

    $ctrl.hidePassword = function() {
        checkFormButton();
        if(!$ctrl.userLogin.password  || !$ctrl.userLogin.confirmPassword) {
            alert("Passwords must comprise 6 characters, including a number, and must match");
            $ctrl.inputType = 'text';
        }
        else if($ctrl.userLogin.password == $ctrl.userLogin.confirmPassword) {
            $ctrl.inputType = 'password';
        }
        else {
            alert("Re-entered password must match!");
            $ctrl.inputType = 'text';
        }
    }

    function getPortalName(defaultPortalName) {
        return window._portalConfiguration && window._portalConfiguration.portalName
          ? window._portalConfiguration.portalName
          : defaultPortalName;
      } 


    function validateForm(){
        printFormButtonAlert();
    }

    function checkUserLoginForm() {
        var isGood = false;
        if($ctrl.userLogin.userName == undefined || $ctrl.userLogin.password == undefined) {
            alert("All fields are mandatory!");
            return ;
        }
        else if ($ctrl.userLogin.password != $ctrl.userLogin.confirmPassword) {
            alert("Your passwords do not match");
            return;
        }
        else {
            isGood = true;
        }
        return isGood;
    }

    function validateEmail(email,confirmEmail){
        var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(!emailPattern.test($ctrl.email) && !emailPattern.test($ctrl.email)){
            return false;
        }
        return true;
    }



    function CreateURL(nextPageName) {
        var url = '/gateway/' + $ctrl.experienceName + '/' + nextPageName;
        return url;
    }

function doPost() {
        $ctrl.isLoading = true;

        var storedData = getSessionData();
        if (storedData != null) {
            console.log("storedData is not null");
        } else {
            console.log("storedData is null, adding mock responses");
            storedData = addMockResponses(storedData);
        }

        model.doPost(createRequest(storedData))
            .then((data) => {
                console.log('data.message: ' + data.message);

                switch (data.message) {
                    case 'success':
                    case 'Success':
                        if (storedData != null) {
                            storedData['leadKey'] = data.leadKey;
                            storedData['packages'] = data.packages;
                            sessionStorage.setItem("userInfo", encryptData(storedData));
                        }
                        break;
                    case 'KnownGreyLister':
                        if (storedData != null) {
                            storedData['leadKey'] = data.leadKey;
                            storedData['packages'] = data.packages;
                            sessionStorage.setItem("userInfo", encryptData(storedData));
                        }
                        break;
                    case 'Request Failed':
                        console.log("request failed");
                        storedData = addMockResponses(storedData);
                        sessionStorage.setItem("userInfo", encryptData(storedData));
                        break;
                    default:
                        console.log("default switch");
                        storedData = addMockResponses(storedData);
                        sessionStorage.setItem("userInfo", encryptData(storedData));
                        alert('A networking error occurred, please try again later');
                        break;
                }
            })
            .catch(error => {
                $ctrl.error = errorMessage(error.code);
                bus.publish('widget-select-goal-ng.load.failed', { error });
                console.log(error);
                storedData = addMockResponses(storedData);
                sessionStorage.setItem("userInfo", encryptData(storedData));
            })
            .then(() => {
                console.log('leadKey and packages saved to browser session.');
                saveDataToSession();
                $ctrl.isLoading = false;
                window.location.href = CreateURL('select-package');
            });

    }
    
    // function doPost() {
    //     $ctrl.isLoading = true;

    //     var storedData = getSessionData();
    //     if (storedData != null) {
    //         console.log("storedData is not null");
    //     } else {
    //         console.log("storedData is null, adding mock responses");
    //         storedData = addMockResponses(storedData);
    //     }

    //     model.doPost(createRequest(storedData))
    //         .then((data) => {
    //             console.log('data.message: ' + data.message);

    //             if (data.message == 'Success' || 'KnownGreyLister') {
    //                 if (storedData != null) {
    //                     storedData['leadKey'] = data.leadKey;
    //                     storedData['packages'] = data.packages;
    //                     sessionStorage.setItem("userInfo", encryptData(storedData));
    //                 }
    //             } else {
    //                 storedData = addMockResponses(storedData);
    //                 sessionStorage.setItem("userInfo", encryptData(storedData));
    //             }
    //         })
    //         .catch(error => {
    //             $ctrl.error = errorMessage(error.code);
    //             bus.publish('widget-select-goal-ng.load.failed', { error });
    //             console.log(error);
    //             storedData = addMockResponses(storedData);
    //             sessionStorage.setItem("userInfo", encryptData(storedData));
    //         })
    //         .then(() => {
    //             console.log('leadKey and packages saved to browser session.');
    //             saveDataToSession();
    //             $ctrl.isLoading = false;
    //             window.location.href = CreateURL('select-package');
    //         });
    // }


    function addMockResponses(storedData) {
        if (storedData != null) {
            storedData['leadKey'] = 'ADD_LEAD_KEY';
            storedData['packages'] = [{
                "packageKey": "Spending Account",
                "pctPopularity": "88%"
            }];
            return storedData;
        } else {
            storedData = {};
            storedData['leadKey'] = 'ADD_LEAD_KEY';
            storedData['packages'] = [{
                "packageKey": "Spending Account",
                "pctPopularity": "88%"
            }];
            return storedData;
        }
    }


    function createRequest(storedData) {
        try {
            return({
                "firstName": $ctrl.firstName,
                "lastName": $ctrl.lastName,
                "email": $ctrl.confirmEmail,
                "age": storedData.age,
                "householdIncome": storedData.earning.amount,
                "investableAssets": storedData.investableAssets.amount,
                "postalCode": storedData.postalCode,
                "countryCode": storedData.countryCode,
                "segmentKey": storedData.segmentKey,
                "goalKey": storedData.goalKey,
                "stayInTouch": false,
                "packagesPresented": true
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


    function saveDataToSession() {
        var storedData = getSessionData();
        if (storedData){
            storedData['firstName'] = $ctrl.firstName;
            storedData['lastName'] = $ctrl.lastName;
            storedData['email'] = $ctrl.confirmEmail;
            storedData['userName'] = $ctrl.userName;
            sessionStorage.setItem("userInfo", encryptData(storedData));     
        }

        
    }

    function getNextScreenButtonColor(enabled) {
        var enableClass = "registerLoginEnableCss";
        var disableClass = "registerLoginDisableCss";
        if (enabled) {
            return enableClass;
            
        } else {
            return disableClass;
            
        }
    }


    function checkFormButton() {
        console.log("test7");
        if(validateForm()){
            $ctrl.nextScreenButtonColor = getNextScreenButtonColor(true);
            return true;
            console.log("test8");
        }else{
            $ctrl.nextScreenButtonColor = getNextScreenButtonColor(false);
            return false;
            console.log("test9");
        }
    }

    function validateForm() {

        if (!$ctrl.firstName  || !$ctrl.lastName) {
            alert('Please enter your first and last name.');
            return false;
        }
        if ( !$ctrl.email || !$ctrl.confirmEmail) {
            alert('Please enter valid email address.');
            return false;
        }
        if( $ctrl.email.toLowerCase() != $ctrl.confirmEmail.toLowerCase() ){
            alert('Please check that both your email addresses are correct.');
            return false;
        }
        if (!$ctrl.userName || !$ctrl.userName) {
            alert('Please add your username.');
            return false;
        }
        if (!$ctrl.userLogin.confirmPassword || $ctrl.userLogin.password != $ctrl.userLogin.confirmPassword ) {
            alert('Please make sure your passwords match.');
            return false;
        }
        if(!validateEmail($ctrl.email,$ctrl.confirmEmail)){
            alert('Please check that both your email addresses are valid.');
            return false;
        }
        return true
    }
}

