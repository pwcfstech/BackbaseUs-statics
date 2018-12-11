/**
 * @module ext-fob-toolsandservices-ng
 *
 * @description
 * Default extension for widget-fob-toolsandservices-ng
 *
 * @requires vendor-bb-angular-ng-aria
 */
import ngAriaModuleKey from 'vendor-bb-angular-ng-aria';
import CryptoJS from 'vendor-fob-cryptojs-ng';
// import uibCarouselKey from 'vendor-bb-uib-carousel';

// uncomment below to include CSS in your extension
// import '../styles/index.css';

export const dependencyKeys = [
  ngAriaModuleKey,
  // uibCarouselKey
];

export const hooks = {};

export { default as helpers } from './helpers';

export const events = {};
