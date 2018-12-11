import { BbStorageKeys } from './constants';

/* global window */

/**
 * @name LoginController
 * @type {object}
 *
 * @description
 * Login widget
 */
export default function LoginController(
  model,
  widgetInstance,
  $window,
  loginLogoutNotifier,
  bbStorage) {
  const $ctrl = this;
  const portal = $window.b$ && $window.b$.portal;

  const loginRedirectPage = widgetInstance.getStringPreference('loginRedirectPage');

  const loginRedirectUrl = portal ?
    `${portal.config.serverRoot}/${portal.portalName}/${loginRedirectPage}` :
    loginRedirectPage;

  const $onInit = () => {
    if ($window.location.search && $window.location.search.indexOf('sa-error') !== -1) {
      $ctrl.loginError = true;
      $ctrl.loginErrorCode = 'sa-error';
    }
  };

  const login = () => {
    $ctrl.isLoading = true;
    return model.login($ctrl.username, $ctrl.password, $ctrl.extraFormFields)
      .then((response) => {
        $ctrl.isLoading = false;
        if (response.status === 200) {
          loginLogoutNotifier.setUserLoggedIn();
          bbStorage.removeItem(BbStorageKeys.PRODUCT_SUMMARY);
          bbStorage.removeItem(BbStorageKeys.PRODUCT_SELECTED);
          bbStorage.removeItem(BbStorageKeys.PRODUCTS_SELECTED);
          bbStorage.removeItem(BbStorageKeys.CONTACT_SELECTED);
          $window.location.assign(loginRedirectUrl);
        }
      }).catch((response) => {
        $ctrl.isLoading = false;
        $ctrl.loginError = true;
        $ctrl.loginErrorCode = response.status;
        $ctrl.password = '';
      });
  };

  Object.assign($ctrl, {
    /**
     * @description
     * AngularJS Lifecycle hook used to initialize the controller
     * @type {function}
     *
     * @name LoginController#$onInit
     * @returns {void}
     */
    $onInit,
    /**
     * @description Login function
     * @type {function}
     *
     * @name LoginController#login
     * @returns {Promise}
     */
    login,
    /**
     * @name LoginController#username
     * @type {string}
     */
    username: '',
    /**
     * @name LoginController#password
     * @type {string}
     */
    password: '',
    /**
     * @name LoginController#extraFormFields
     * @type {object}
     */
    extraFormFields: {},
    /**
     * @name LoginController#loginError
     * @type {boolean}
     */
    loginError: false,
    /**
     * @name LoginController#loginErrorCode
     * @type {number}
     */
    loginErrorCode: 0,
    /**
     * @description
     * Loading status
     *
     * @name isLoading
     * @type {boolean}
     */
    isLoading: false,
  });
}
