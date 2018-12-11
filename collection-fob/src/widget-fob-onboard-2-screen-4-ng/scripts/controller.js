/**
 * @module widget-fob-onboard-2-screen-4-ng
 * @name Onboard2Screen4Controller
 *
 * @description
 * Onboard 2 screen 4
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';


const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');


export default function Onboard2Screen4Controller(bus, hooks, widget, model) {
    const $ctrl = this;
  

    const $onInit = () => {
        $ctrl.isLoading = true;
        $ctrl.firstName =  null;
        $ctrl.userInfo = getSessionData();
        console.log($ctrl.userInfo);
        if ($ctrl.userInfo != null) {
            $ctrl.flname = $ctrl.userInfo['firstName'] + ' ' + $ctrl.userInfo['lastName'];
        } else {
            $ctrl.flname =  "Mary Doe";    
        }
        
        $ctrl.screenButtonColor1 = getNextScreenButtonColor(false);
        $ctrl.screenButtonColor2 = getNextScreenButtonColor(false);
        $ctrl.screenButtonColor3 = getNextScreenButtonColor(false);
        /* FOB Experience */
       /*$ctrl.experienceName = 'future-of-banking';*/
        $ctrl.experienceName=getPortalName('retail-banking-demo');

        $ctrl.moveToNextScreen = function() {
           if($ctrl.isUsCitizen != true) {
                 alert("Please confirm US Citizenship");
            } else {
                window.location.href = CreateURL('review-info');  
            }
        };

        $ctrl.moveToPreviousScreen = function() {
            window.location.href = CreateURL('current-address');
        };

        $ctrl.SSID1 = null;
        $ctrl.SSID2 = null;

        $ctrl.isUsCitizen = null;
        $ctrl.citizenship = function(citizen) {
            if(citizen==='USCITIZEN'){
                $ctrl.isUsCitizen = true;
                $ctrl.screenButtonColor1 = getNextScreenButtonColor(true);
                $ctrl.screenButtonColor2 = getNextScreenButtonColor(false);
                $ctrl.screenButtonColor3 = getNextScreenButtonColor(false);
            }else if(citizen==='PERMRESIDENT') {
                $ctrl.isUsCitizen = true;
                $ctrl.permResident = true;
                $ctrl.screenButtonColor1 = getNextScreenButtonColor(false);
                $ctrl.screenButtonColor2 = getNextScreenButtonColor(true);  
                $ctrl.screenButtonColor3 = getNextScreenButtonColor(false);
            }else {
                $ctrl.isUsCitizen = true;
                $ctrl.permResident = false;
                $ctrl.screenButtonColor1 = getNextScreenButtonColor(false);
                $ctrl.screenButtonColor2 = getNextScreenButtonColor(false);
                $ctrl.screenButtonColor3 = getNextScreenButtonColor(true);
            }

            if($ctrl.isValidSsn($ctrl.SSID1)){
                if($ctrl.isValidSsn($ctrl.SSID2)) {
                    if ($ctrl.SSID1 != $ctrl.SSID2) {
                        alert("Please confirm your SSN match");
                    } else {
                        saveDataToSession(citizen,$ctrl.ssid);
                    } 
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
    });  // end of Object.assign()


//---------------------------------------------------------------------------------
//  FOB  FUNCTIONS
//---------------------------------------------------------------------------------

    $ctrl.agreeAlert = function() {
            alert('Must agree to continue');
    };
    
     $ctrl.formatSsn = function(ssn){
        if(!ssn){
            return ;
        }

        if (ssn.length === 11){
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

    function getPortalName(defaultPortalName) {
        return window._portalConfiguration && window._portalConfiguration.portalName
          ? window._portalConfiguration.portalName
          : defaultPortalName;
      } 

    function CreateURL(nextPageName) {
        var url = '/gateway/' + $ctrl.experienceName + '/' + nextPageName;
        return url;
    }




    function getNextScreenButtonColor(enabled) {
    var enableClass = "registerLoginEnableCss";
    var disbleClass = "registerLoginDisableCss";
        if (enabled) {
            return enableClass;
        } else {
            return disbleClass;
        }
    }
    
    $ctrl.isValidSsn = function(num){
        var SSNRegex = new RegExp('^(?!000)(?!666)(?!9)\\d{3}[- ]?(?!00)\\d{2}[- ]?(?!0000)\\d{4}$');
        if(!SSNRegex.test(num)){
            alert("Please enter valid SSN");
            return false;
        }
        return true;
    }

    
    

    function saveDataToSession(citizen,ssid) {
        $ctrl.userInfo.ssid = $ctrl.SSID1;
        $ctrl.userInfo.citizenship = citizen;
         if($ctrl.userInfo){
            sessionStorage.setItem("userInfo", encryptData($ctrl.userInfo));        
          }  
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
        return CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.AES.getFobKey());
    }


    function decryptData(data) {
        return JSON.parse(CryptoJS.AES.decrypt(data, CryptoJS.AES.getFobKey()).toString(CryptoJS.enc.Utf8));
    }

}