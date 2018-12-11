/**
 * @module ext-fob-onboard-2-terms
 *
 * @description
 * Default extension for widget-fob-onboard-2-terms
 *
 * @requires vendor-bb-angular-ng-aria
 */
import ngAriaModuleKey from 'vendor-bb-angular-ng-aria';
import uibProgressbarKey from 'vendor-bb-uib-progressbar';
import uiBbLoadingIndicatorKey from 'ui-bb-loading-indicator-ng';
import uibModalKey from 'vendor-bb-uib-modal';
import CryptoJS from 'vendor-fob-cryptojs-ng';
// uncomment below to include CSS in your extension
// import '../styles/index.css';

export const dependencyKeys = [
  ngAriaModuleKey,uibProgressbarKey,uiBbLoadingIndicatorKey,uibModalKey,
  // ngAriaModuleKey,
];

export const hooks = {};

export const helpers = {};

export const events = {};
