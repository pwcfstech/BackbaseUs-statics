/**
 * @module widget-fob-landing-ng
 * @name LandingController
 *
 * @description
 * Landing
 */
import { E_AUTH, E_CONNECTIVITY } from 'lib-bb-model-errors';


const errorMessage = (code) => ({
  [E_AUTH]: 'error.load.auth',
  [E_CONNECTIVITY]: 'error.load.connectivity',
}[code] || 'error.load.unexpected');


export default function LandingController(bus, hooks, widget, model) {
    const $ctrl = this;
    $ctrl.myInterval = 1000;

    /**
    * AngularJS Lifecycle hook used to initialize the controller
    *
    * @name LandingController#$onInit
    * @type {function}
    * @returns {void}
    */
    const $onInit = () => {
        $ctrl.isLoading = true;

        $ctrl.userInfoObj = {};
        $ctrl.btn = ['See how we can help you', 'Enroll in an account'];
        $ctrl.slides = [
            {
                productName: "Goal Setting & Tracking",
                productImg: "GoalSettingTrackin.jpg",
                id: 1
            },
            {
                productName: 'Saving Tips',
				//productName: 'Saving Tips & Recommendations',
                productImg: "TipsRecommendations.jpg",
                id: 2
            },
            {
                productName: 'Rewards Program',
                productImg: "reward2.jpg",
                id: 3
            }
        ];

        $ctrl.moveToOnboarding = function() {
            window.location.href = CreateURL('register-or-login');
        };

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

//----------------------------------------------------------------
//   FOB
//----------------------------------------------------------------

    /*$ctrl.experienceName = 'future-of-banking';*/
    $ctrl.experienceName=getPortalName('retail-banking-demo');

    $ctrl.moveToNextScreen = function() {
        window.location.href = CreateURL('user-info');
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


    $ctrl.tapButton = function(actionItem) {
        var userSelection = actionItem['$index'];
        try {
            // TODO: Figure out what this session item is
            sessionStorage.setItem('userLandingPageAction', $ctrl.btn[userSelection]);

            if(userSelection == 0) {
                $ctrl.moveToNextScreen();
            }
            else if (userSelection == 1) {
                $ctrl.moveToOnboarding();
            }
            else {
                console.log('Unhandled error: tapButton() action unidentified = ' + userSelection);
            }
        }
        catch (err) {
            console.log('Error: tapButton() function threw an exception.');
            console.log(err);
        }
    }

} // end of export function()
